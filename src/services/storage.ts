import { tossGetItem, tossSetItem } from "./tossAdapter";

const BEST_SCORE_KEY = "hidden-chameleon:best-score";

export async function loadBestScore(): Promise<number> {
  try {
    const tossValue = await tossGetItem(BEST_SCORE_KEY);
    const rawValue = tossValue ?? window.localStorage.getItem(BEST_SCORE_KEY);
    return rawValue ? Number.parseInt(rawValue, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export async function saveBestScore(score: number): Promise<void> {
  try {
    await tossSetItem(BEST_SCORE_KEY, String(score));
  } catch {
    // Fallback below.
  }

  try {
    window.localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch {
    // Storage can be unavailable in restricted webviews.
  }
}
