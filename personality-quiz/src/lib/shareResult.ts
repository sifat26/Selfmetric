import type { QuizResult } from './quizScoring';

const STORAGE_KEY = 'personality_quiz_result';

export function encodeResult(result: QuizResult): string {
  try {
    const json = JSON.stringify(result);
    return btoa(encodeURIComponent(json));
  } catch {
    return '';
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
  const base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
  return `${base}/result?data=${encoded}`;
}

export function saveResultToStorage(result: QuizResult): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // storage might be unavailable in some contexts
  }
}

export function loadResultFromStorage(): QuizResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as QuizResult;
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
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  }
}

export function buildShareText(
  blendLabel: string,
  primaryColor: string,
  primaryName: string,
  primaryPercent: number
): string {
  return `I just took the Communication Selfmetric and discovered I'm a ${blendLabel} — primarily ${primaryColor} / ${primaryName} (${primaryPercent}%). Find out your style →`;
}
