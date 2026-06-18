import type { GameScore } from "../types";

export function calculateFinalScore(score: GameScore): number {
  const pairs = score.matches;
  const attempts = score.attempts;
  const elapsed = Math.floor(((score.endTime || Date.now()) - score.startTime) / 1000);
  return (pairs * 100) - ((attempts - pairs) * 10) - elapsed;
}

export function calculateProgress(matches: number, totalCards: number): number {
  return totalCards > 0 ? Math.round((matches / (totalCards / 2)) * 100) : 0;
}