import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 8787);
const GOALS = new Set(["career", "relationship", "teamwork", "self_growth"]);
const VALID_TYPES = new Set(["red", "blue", "green", "yellow"]);

// --- Supabase client (server-side, uses secret key to bypass RLS) ---
function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// --- Simple in-memory rate limiter (per IP, 5 req/min for results endpoint) ---
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.start > RATE_LIMIT_WINDOW) rateLimitMap.delete(ip);
  }
}, 300_000);

// --- Admin auth middleware ---
async function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing authorization token." });
  }
  const token = auth.slice(7);
  const supabase = getSupabase();
  if (!supabase)
    return res.status(503).json({ error: "Database not configured." });

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
  req.adminUser = data.user;
  req.adminToken = token;
  next();
}

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

// ========== Quiz Results & Admin Routes ==========

// POST /api/results — Save a quiz result (public, rate-limited)
app.post("/api/results", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.ip || "unknown";
  if (!checkRateLimit(ip)) {
    return res
      .status(429)
      .json({ error: "Too many requests. Try again later." });
  }

  const supabase = getSupabase();
  if (!supabase)
    return res.status(503).json({ error: "Database not configured." });

  const { sessionId, result, goal, refCode, respondentName } = req.body || {};

  if (!sessionId || typeof sessionId !== "string") {
    return res.status(400).json({ error: "sessionId is required." });
  }
  if (!result || typeof result !== "object") {
    return res.status(400).json({ error: "result is required." });
  }
  if (!VALID_TYPES.has(result.primaryType)) {
    return res.status(400).json({ error: "Invalid primaryType." });
  }
  if (!VALID_TYPES.has(result.secondaryType)) {
    return res.status(400).json({ error: "Invalid secondaryType." });
  }
  if (
    typeof result.totalAnswered !== "number" ||
    result.totalAnswered < 10 ||
    result.totalAnswered > 40
  ) {
    return res
      .status(400)
      .json({ error: "totalAnswered must be between 10 and 40." });
  }
  if (goal && !GOALS.has(goal)) {
    return res.status(400).json({ error: "Invalid goal." });
  }

  const row = {
    session_id: sessionId.slice(0, 64),
    primary_type: result.primaryType,
    secondary_type: result.secondaryType,
    confidence_level: result.confidenceLevel || "balanced",
    blend_label: result.blendLabel || "",
    is_blend: !!result.isBlend,
    is_adaptive: !!result.isAdaptive,
    total_answered: result.totalAnswered,
    scores: result.scores || {},
    percentages: result.percentages || {},
    goal: goal || null,
    ref_code:
      refCode && typeof refCode === "string" ? refCode.slice(0, 32) : null,
    respondent_name:
      respondentName && typeof respondentName === "string"
        ? respondentName.trim().slice(0, 100)
        : null,
  };

  const { data, error } = await supabase
    .from("quiz_results")
    .insert(row)
    .select("id, created_at")
    .single();

  if (error) {
    console.error("Supabase insert error:", error.message);
    return res.status(500).json({ error: "Failed to save result." });
  }

  res.json({ id: data.id, created_at: data.created_at });
});

// ========== Shared Link Routes ==========

// POST /api/shared-links — Create a shareable quiz link
app.post("/api/shared-links", async (req, res) => {
  const supabase = getSupabase();
  if (!supabase)
    return res.status(503).json({ error: "Database not configured." });

  const { label } = req.body || {};
  // Generate a short random code (8 chars)
  const code = crypto.randomUUID().replace(/-/g, "").slice(0, 8);

  const { data, error } = await supabase
    .from("shared_links")
    .insert({
      code,
      label: typeof label === "string" ? label.slice(0, 100) : "",
    })
    .select("id, code, created_at")
    .single();

  if (error) {
    console.error("Shared link insert error:", error.message);
    return res.status(500).json({ error: "Failed to create link." });
  }

  res.json(data);
});

// GET /api/shared-links/:code/results — View results for a shared link (public)
app.get("/api/shared-links/:code/results", async (req, res) => {
  const supabase = getSupabase();
  if (!supabase)
    return res.status(503).json({ error: "Database not configured." });

  const { code } = req.params;
  if (!code || code.length > 32) {
    return res.status(400).json({ error: "Invalid code." });
  }

  // Verify the link exists
  const { data: link, error: linkErr } = await supabase
    .from("shared_links")
    .select("id, code, label, created_at")
    .eq("code", code)
    .single();

  if (linkErr || !link) {
    return res.status(404).json({ error: "Shared link not found." });
  }

  // Get all results tagged with this ref_code
  const { data: results, error: resErr } = await supabase
    .from("quiz_results")
    .select(
      "id, primary_type, secondary_type, confidence_level, blend_label, is_blend, percentages, respondent_name, created_at",
    )
    .eq("ref_code", code)
    .order("created_at", { ascending: false });

  if (resErr) {
    return res.status(500).json({ error: "Failed to fetch results." });
  }

  res.json({ link, results: results || [] });
});

// POST /api/admin/login — Admin login via Supabase Auth
app.post("/api/admin/login", async (req, res) => {
  const supabase = getSupabase();
  if (!supabase)
    return res.status(503).json({ error: "Database not configured." });

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  res.json({
    access_token: data.session.access_token,
    expires_at: data.session.expires_at,
  });
});

// GET /api/admin/stats — Dashboard stats (protected)
app.get("/api/admin/stats", requireAdmin, async (req, res) => {
  const supabase = getSupabase();

  // Total count
  const { count: totalResults } = await supabase
    .from("quiz_results")
    .select("*", { count: "exact", head: true });

  // Type distribution
  const { data: allRows } = await supabase
    .from("quiz_results")
    .select(
      "primary_type, confidence_level, goal, percentages, created_at, secondary_type, blend_label, is_blend",
    );

  const typeDistribution = {};
  const confidenceBreakdown = {};
  const goalBreakdown = {};
  const dailyMap = {};
  let todayCount = 0;
  const avgPct = { red: 0, blue: 0, green: 0, yellow: 0 };
  const todayStr = new Date().toISOString().slice(0, 10);

  const rows = allRows || [];
  for (const row of rows) {
    // Type distribution
    typeDistribution[row.primary_type] =
      (typeDistribution[row.primary_type] || 0) + 1;

    // Confidence
    confidenceBreakdown[row.confidence_level] =
      (confidenceBreakdown[row.confidence_level] || 0) + 1;

    // Goal
    const g = row.goal || "none";
    goalBreakdown[g] = (goalBreakdown[g] || 0) + 1;

    // Daily trend (last 30 days)
    const day = row.created_at.slice(0, 10);
    dailyMap[day] = (dailyMap[day] || 0) + 1;

    // Today
    if (day === todayStr) todayCount++;

    // Average percentages
    const pct = row.percentages || {};
    avgPct.red += pct.red || 0;
    avgPct.blue += pct.blue || 0;
    avgPct.green += pct.green || 0;
    avgPct.yellow += pct.yellow || 0;
  }

  const n = rows.length || 1;
  const averagePercentages = {
    red: Math.round(avgPct.red / n),
    blue: Math.round(avgPct.blue / n),
    green: Math.round(avgPct.green / n),
    yellow: Math.round(avgPct.yellow / n),
  };

  // Daily trend: last 30 days
  const dailyTrend = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dailyTrend.push({ date: key, count: dailyMap[key] || 0 });
  }

  // Recent results (last 20)
  const { data: recentResults } = await supabase
    .from("quiz_results")
    .select(
      "id, primary_type, secondary_type, confidence_level, blend_label, is_blend, goal, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(20);

  res.json({
    totalResults: totalResults || 0,
    todayCount,
    typeDistribution,
    confidenceBreakdown,
    goalBreakdown,
    dailyTrend,
    averagePercentages,
    recentResults: recentResults || [],
  });
});

// GET /api/admin/export — Export CSV (protected, supports token via query param for browser download)
app.get(
  "/api/admin/export",
  async (req, res, next) => {
    // Allow token via query param for window.open downloads
    if (!req.headers.authorization && req.query.token) {
      req.headers.authorization = `Bearer ${req.query.token}`;
    }
    next();
  },
  requireAdmin,
  async (req, res) => {
    const supabase = getSupabase();

    const { data: rows, error } = await supabase
      .from("quiz_results")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: "Failed to fetch results." });
    }

    const headers = [
      "id",
      "session_id",
      "primary_type",
      "secondary_type",
      "confidence_level",
      "blend_label",
      "is_blend",
      "is_adaptive",
      "total_answered",
      "goal",
      "created_at",
      "score_red",
      "score_blue",
      "score_green",
      "score_yellow",
      "pct_red",
      "pct_blue",
      "pct_green",
      "pct_yellow",
    ];

    const csvRows = [headers.join(",")];
    for (const r of rows || []) {
      const s = r.scores || {};
      const p = r.percentages || {};
      csvRows.push(
        [
          r.id,
          r.session_id,
          r.primary_type,
          r.secondary_type,
          r.confidence_level,
          `"${(r.blend_label || "").replace(/"/g, '""')}"`,
          r.is_blend,
          r.is_adaptive,
          r.total_answered,
          r.goal || "",
          r.created_at,
          s.red || 0,
          s.blue || 0,
          s.green || 0,
          s.yellow || 0,
          p.red || 0,
          p.blue || 0,
          p.green || 0,
          p.yellow || 0,
        ].join(","),
      );
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=selfmetric-results.csv",
    );
    res.send(csvRows.join("\n"));
  },
);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`AI backend running on http://localhost:${PORT}`);
  });
}

export default app;
