export type CardSymbol = "🍎" | "🍌" | "🍇" | "🍊" | "🍋" | "🍉" | "🍓" | "🍒";

export type CardData = {
  id: string;
  symbol: CardSymbol;
  state: "hidden" | "revealed" | "matched";
};

export type GameScore = {
  attempts: number;
  matches: number;
  startTime: number;
  endTime?: number;
};

export type HighScoreEntry = {
  name: string;
  pairs: number;
  attempts: number;
  time: string;
  score: number;
  date?: number;
};

export type AppState = {
  currentView: "playing" | "won";
  cards: CardData[];
  score: GameScore;
  flippedCards: string[];
  highScores: HighScoreEntry[];
};