import type { CardSymbol, HighScoreEntry } from "../types";

export function shuffle(array: CardSymbol[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    const temp = array[i]
    if (temp === undefined || array[j] === undefined) {
        continue
    }
   
    array[i] = array[j]
    array[j] = temp
  }
}

export function sortByDescending(items: HighScoreEntry[]): HighScoreEntry[] {
  return [...items].sort((a, b) => b.score - a.score);
}