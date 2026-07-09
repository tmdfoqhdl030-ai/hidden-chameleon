export type AnswerZone =
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
    }
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    };

export type Stage = {
  id: string;
  title: string;
  theme: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  imageSrc?: string;
  svg?: string;
  camouflageOpacity?: number;
  answerZones: AnswerZone[];
};

export type GameStatus = "home" | "playing" | "paused" | "result";

export type GameState = {
  status: GameStatus;
  timeLeft: number;
  score: number;
  combo: number;
  maxCombo: number;
  stageIndex: number;
  foundCount: number;
  missCount: number;
  totalTapCount: number;
  hintVisible: boolean;
  hintUsedCount: number;
  lastFeedback?: "correct" | "wrong" | "hint";
  stageOrder: number[];
  bestScore: number;
};
