import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8787);
const GOALS = new Set(["career", "relationship", "teamwork", "self_growth"]);

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.options("/api/ai-suggestions", cors());

function getProvider() {
  return (process.env.AI_PROVIDER || "groq").toLowerCase();
}

function getDefaultModel(provider) {
  if (provider === "gemini") return "gemini-2.0-flash-lite";
  if (provider === "openrouter") return "meta-llama/llama-3.1-8b-instruct:free";
  return "llama-3.1-8b-instant";
}

function sanitizeList(input, fallback) {
  if (!Array.isArray(input)) return fallback;
  const cleaned = input
    .map((entry) => (typeof entry === "string" ? entry.trim() : ""))
    .filter(Boolean)
    .slice(0, 6);
  return cleaned.length ? cleaned : fallback;
}

function containsDisallowedContent(text) {
  const blockedTerms = [
    "clinical diagnosis",
    "medical diagnosis",
    "mentally ill",
    "mental illness",
    "disorder",
    "depression",
    "anxiety disorder",
    "bipolar",
    "schizophrenia",
    "personality disorder",
    "always",
    "never",
  ];

  const value = text.toLowerCase();
  return blockedTerms.some((term) => value.includes(term));
}

function hasUnsafeContent(suggestions) {
  const fields = [
    suggestions.personalizedSummary,
    ...suggestions.communicationAdvice,
    ...suggestions.careerSuggestions,
    ...suggestions.relationshipAdvice,
    ...suggestions.stressManagementTips,
    ...suggestions.growthPlan,
    ...suggestions.threeActionsThisWeek,
  ];

  return fields.some((entry) => containsDisallowedContent(entry));
}

function buildFallbackSuggestions(payload) {
  return {
    personalizedSummary: `You show a ${payload.primaryType.toUpperCase()}-leaning style with ${payload.secondaryType.toUpperCase()} support. Use this as a self-reflection guide, not a diagnosis.`,
    communicationAdvice: [
      "Name your main point in the first sentence before adding details.",
      "Ask one clarifying question before responding in high-stakes conversations.",
      "Match your pace to the other person: quick summary first, then examples.",
    ],
    careerSuggestions: [
      "Choose projects where your primary style is useful but your secondary style is also needed.",
      "Share weekly updates in a format your team can scan quickly.",
      "Build a repeatable meeting structure for better collaboration.",
    ],
    relationshipAdvice: [
      "State intent before feedback: explain you want understanding, not winning.",
      'Use "I notice..." and "I need..." language for sensitive topics.',
      "Confirm what you heard before offering your perspective.",
    ],
    stressManagementTips: [
      "Pause for 90 seconds before sending difficult messages.",
      "Break large conversations into one clear objective each.",
      "Use short check-ins with trusted people to recalibrate communication tone.",
    ],
    growthPlan: [
      "Week 1: Track one communication win and one friction point daily.",
      "Week 2: Practice adapting detail level for different audiences.",
      "Week 3: Request direct feedback from one teammate or friend.",
    ],
    threeActionsThisWeek: [
      "Prepare a one-minute summary before your next important conversation.",
      "Run one feedback conversation using a calm structure: context, impact, request.",
      "Reflect for 10 minutes at week end on what communication habit improved most.",
    ],
  };
}

function normalizeSuggestions(input, fallback) {
  const normalized = {
    personalizedSummary:
      typeof input.personalizedSummary === "string" &&
      input.personalizedSummary.trim()
        ? input.personalizedSummary.trim()
        : fallback.personalizedSummary,
    communicationAdvice: sanitizeList(
      input.communicationAdvice,
      fallback.communicationAdvice,
    ),
    careerSuggestions: sanitizeList(
      input.careerSuggestions,
      fallback.careerSuggestions,
    ),
    relationshipAdvice: sanitizeList(
      input.relationshipAdvice,
      fallback.relationshipAdvice,
    ),
    stressManagementTips: sanitizeList(
      input.stressManagementTips,
      fallback.stressManagementTips,
    ),
    growthPlan: sanitizeList(input.growthPlan, fallback.growthPlan),
    threeActionsThisWeek: sanitizeList(
      input.threeActionsThisWeek,
      fallback.threeActionsThisWeek,
    ).slice(0, 3),
  };

  if (
    !normalized.personalizedSummary.toLowerCase().includes("self-reflection")
  ) {
    normalized.personalizedSummary = `${normalized.personalizedSummary} This is for self-reflection only.`;
  }

  return normalized;
}

function extractJsonObject(rawText) {
  if (!rawText) return null;
  const start = rawText.indexOf("{");
  const end = rawText.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  const jsonSlice = rawText.slice(start, end + 1);
  return JSON.parse(jsonSlice);
}

function buildPrompt(payload) {
  return `You are a communication coach. Generate practical, supportive advice based on this user's quiz result.

Personality result:
Primary type: ${payload.primaryType}
Secondary type: ${payload.secondaryType}
Confidence level: ${payload.confidenceLevel}
Score percentages: ${JSON.stringify(payload.percentages)}
User goal: ${payload.userGoal || "self_growth"}

Rules:
- This is not a clinical diagnosis.
- Do not discuss mental disorders.
- Do not overstate accuracy.
- Give practical and kind advice.
- Keep the advice specific and useful.

Output requirements:
- Use concise, practical language.
- Avoid extreme certainty words like "always" and "never".
- Explain this is for self-reflection only.

Return JSON only:
{
  "personalizedSummary": "",
  "communicationAdvice": [],
  "careerSuggestions": [],
  "relationshipAdvice": [],
  "stressManagementTips": [],
  "growthPlan": [],
  "threeActionsThisWeek": []
}`;
}

function validatePayload(body) {
  if (!body || typeof body !== "object") {
    return "Invalid request body.";
  }

  const requiredStringFields = [
    "primaryType",
    "secondaryType",
    "confidenceLevel",
  ];
  for (const field of requiredStringFields) {
    if (typeof body[field] !== "string" || !body[field].trim()) {
      return `Field ${field} is required.`;
    }
  }

  if (!body.percentages || typeof body.percentages !== "object") {
    return "Field percentages is required.";
  }

  const pctKeys = ["red", "yellow", "green", "blue"];
  for (const key of pctKeys) {
    if (typeof body.percentages[key] !== "number") {
      return `percentages.${key} must be a number.`;
    }
  }

  if (body.userGoal && !GOALS.has(body.userGoal)) {
    return "userGoal must be one of: career, relationship, teamwork, self_growth.";
  }

  return null;
}

async function callGemini({ apiKey, model, prompt }) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${errorText}`);
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text || "")
      .join("") || "";
  return text;
}

async function callOpenAICompatible({ provider, apiKey, model, prompt }) {
  const endpoint =
    provider === "openrouter"
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "https://api.groq.com/openai/v1/chat/completions";

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  if (provider === "openrouter") {
    headers["HTTP-Referer"] = "https://selfmetric.app";
    headers["X-Title"] = "Selfmetric";
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content:
            "You are a communication coach. Follow safety rules strictly. Return valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${provider} request failed: ${errorText}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "";
}

async function callProvider(payload) {
  const provider = getProvider();
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL || getDefaultModel(provider);

  if (!apiKey) {
    throw new Error(
      "AI_API_KEY is missing. Set it in your environment variables.",
    );
  }

  const prompt = buildPrompt(payload);

  if (provider === "gemini") {
    return {
      provider,
      model,
      rawText: await callGemini({ apiKey, model, prompt }),
    };
  }

  if (provider === "groq" || provider === "openrouter") {
    return {
      provider,
      model,
      rawText: await callOpenAICompatible({ provider, apiKey, model, prompt }),
    };
  }

  throw new Error("AI_PROVIDER must be one of: gemini, groq, openrouter.");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/ai-suggestions", async (req, res) => {
  const validationError = validatePayload(req.body);
  if (validationError) {
    res.status(400).json({ error: validationError });
    return;
  }

  const payload = req.body;
  const fallback = buildFallbackSuggestions(payload);

  try {
    const { provider, model, rawText } = await callProvider(payload);
    const parsed = extractJsonObject(rawText);
    const normalized = normalizeSuggestions(parsed || {}, fallback);
    const safeSuggestions = hasUnsafeContent(normalized)
      ? fallback
      : normalized;

    res.json({
      provider,
      model,
      suggestions: safeSuggestions,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    res.status(502).json({
      error: "AI provider request failed. Please try again.",
      details: message,
      suggestions: fallback,
    });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`AI backend running on http://localhost:${PORT}`);
  });
}

export default app;
