export function getComboBonus(combo: number): number {
  if (combo >= 10) return 150;
  if (combo >= 5) return 70;
  if (combo >= 3) return 30;
  return 0;
}

export function calculateAnswerScore(timeLeft: number, nextCombo: number): number {
  return 100 + Math.floor(timeLeft) * 2 + getComboBonus(nextCombo);
}

export function applyTimePenalty(timeLeft: number, penalty: number): number {
  return Math.max(0, timeLeft - penalty);
}

export function calculateAccuracy(foundCount: number, totalTapCount: number): number {
  if (totalTapCount === 0) return 0;
  return Math.round((foundCount / totalTapCount) * 100);
}

export function getResultRank(score: number, foundCount: number): string {
  if (score >= 3000 || foundCount >= 14) return "전설의 관찰자";
  if (score >= 2200 || foundCount >= 10) return "매의 눈";
  if (score >= 1400 || foundCount >= 7) return "집중 탐색가";
  if (score >= 700 || foundCount >= 4) return "숨은그림 수색대";
  return "도전 중인 탐험가";
}
