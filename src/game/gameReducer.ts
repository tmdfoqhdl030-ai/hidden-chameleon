import type { GameState } from "./gameTypes";
import { stages } from "./stages";

type GameAction =
  | { type: "LOAD_BEST_SCORE"; bestScore: number }
  | { type: "START" }
  | { type: "TICK" }
  | { type: "CORRECT" }
  | { type: "WRONG" }
  | { type: "USE_HINT" }
  | { type: "HIDE_HINT" }
  | { type: "CLEAR_FEEDBACK" }
  | { type: "RESULT" }
  | { type: "HOME" };

export const initialGameState: GameState = {
  status: "home",
  timeLeft: 0,
  score: 0,
  combo: 0,
  maxCombo: 0,
  stageIndex: 0,
  foundCount: 0,
  missCount: 0,
  totalTapCount: 0,
  hintVisible: false,
  hintUsedCount: 0,
  stageOrder: stages.map((_, index) => index),
  bestScore: 0
};

function shuffleOrder(): number[] {
  const order = stages.map((_, index) => index);
  for (let index = order.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
  }
  return order;
}

function advanceStage(state: GameState): Pick<GameState, "stageIndex" | "stageOrder"> {
  const nextIndex = state.stageIndex + 1;
  if (nextIndex < state.stageOrder.length) {
    return { stageIndex: nextIndex, stageOrder: state.stageOrder };
  }

  return { stageIndex: 0, stageOrder: shuffleOrder() };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LOAD_BEST_SCORE":
      return state;
    case "START":
      return {
        ...initialGameState,
        status: "playing",
        stageOrder: shuffleOrder()
      };
    case "TICK":
      return state;
    case "CORRECT": {
      const stageProgress = advanceStage(state);
      return {
        ...state,
        ...stageProgress,
        foundCount: state.foundCount + 1,
        totalTapCount: state.totalTapCount + 1,
        lastFeedback: "correct",
        hintVisible: false
      };
    }
    case "WRONG":
      return {
        ...state,
        missCount: state.missCount + 1,
        totalTapCount: state.totalTapCount + 1,
        lastFeedback: "wrong"
      };
    case "USE_HINT":
      return {
        ...state,
        hintVisible: true,
        hintUsedCount: state.hintUsedCount + 1,
        lastFeedback: "hint"
      };
    case "HIDE_HINT":
      return { ...state, hintVisible: false };
    case "CLEAR_FEEDBACK":
      return { ...state, lastFeedback: undefined };
    case "RESULT":
      return { ...state, status: "result", hintVisible: false };
    case "HOME":
      return initialGameState;
    default:
      return state;
  }
}
