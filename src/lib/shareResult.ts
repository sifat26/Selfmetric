import type { AISuggestions, UserGoal } from "./aiSuggestions";
import type { QuizResult } from "./quizScoring";

const STORAGE_KEY = "personality_quiz_result";

interface ResultStoragePayload {
  result: QuizResult;
  aiSuggestions?: {
    resultSignature: string;
    userGoal?: UserGoal;
    generatedAt: string;
    data: AISuggestions;
  };
}

function getResultSignature(result: QuizResult): string {
  return [
    result.primaryType,
    result.secondaryType,
    result.confidenceLevel,
    result.percentages.red,
    result.percentages.yellow,
    result.percentages.green,
    result.percentages.blue,
  ].join("|");
}

function parseStorage(raw: string): ResultStoragePayload | null {
  try {
    const parsed = JSON.parse(raw) as QuizResult | ResultStoragePayload;
    // Legacy format support: raw quiz result only.
    if ("primaryType" in parsed && "percentages" in parsed) {
      return { result: parsed as QuizResult };
    }
    if ("result" in parsed) {
      return parsed as ResultStoragePayload;
    }
    return null;
  } catch {
    return null;
  }
}

export function encodeResult(result: QuizResult): string {
  try {
    const json = JSON.stringify(result);
    return btoa(encodeURIComponent(json));
  } catch {
    return "";
  }
}

export function decodeResult(encoded: string): QuizResult | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json) as QuizResult;
  } catch {
    return null;
  }
}

export function buildShareUrl(result: QuizResult): string {
  const encoded = encodeResult(result);
  const base =
    window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "");
  return `${base}/result?data=${encoded}`;
}

export function saveResultToStorage(result: QuizResult): void {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? parseStorage(existingRaw) : null;
    const nextPayload: ResultStoragePayload = {
      result,
      aiSuggestions:
        existing?.aiSuggestions &&
        existing.aiSuggestions.resultSignature === getResultSignature(result)
          ? existing.aiSuggestions
          : undefined,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPayload));
  } catch {
    // storage might be unavailable in some contexts
  }
}

export function loadResultFromStorage(): QuizResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return parseStorage(raw)?.result ?? null;
  } catch {
    return null;
  }
}

export function saveAISuggestionsToStorage(
  result: QuizResult,
  aiSuggestions: AISuggestions,
  userGoal?: UserGoal,
): void {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? parseStorage(existingRaw) : null;
    const payload: ResultStoragePayload = {
      result,
      aiSuggestions: {
        resultSignature: getResultSignature(result),
        userGoal,
        generatedAt: new Date().toISOString(),
        data: aiSuggestions,
      },
    };
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(existing ? { ...existing, ...payload } : payload),
    );
  } catch {
    // storage might be unavailable in some contexts
  }
}

export function loadAISuggestionsFromStorage(result: QuizResult): {
  data: AISuggestions;
  userGoal?: UserGoal;
  generatedAt: string;
} | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = parseStorage(raw);
    if (!parsed?.aiSuggestions) return null;
    if (parsed.aiSuggestions.resultSignature !== getResultSignature(result))
      return null;
    return {
      data: parsed.aiSuggestions.data,
      userGoal: parsed.aiSuggestions.userGoal,
      generatedAt: parsed.aiSuggestions.generatedAt,
    };
  } catch {
    return null;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  }
}

export function buildShareText(
  blendLabel: string,
  primaryColor: string,
  primaryName: string,
  primaryPercent: number,
): string {
  return `I just took the Communication Selfmetric and discovered I'm a ${blendLabel} — primarily ${primaryColor} / ${primaryName} (${primaryPercent}%). Find out your style →`;
}
