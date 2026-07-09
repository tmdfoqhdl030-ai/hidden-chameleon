import { useEffect, useMemo, useReducer, useState } from "react";
import { CreditsModal } from "../components/CreditsModal";
import { GameScreen } from "../components/GameScreen";
import { HomeScreen } from "../components/HomeScreen";
import { HowToPlayModal } from "../components/HowToPlayModal";
import { ResultScreen } from "../components/ResultScreen";
import { gameReducer, initialGameState } from "../game/gameReducer";
import { stages } from "../game/stages";

export function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [howToOpen, setHowToOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const currentStage = useMemo(() => stages[state.stageOrder[state.stageIndex]], [state.stageIndex, state.stageOrder]);

  useEffect(() => {
    const imageSources = Array.from(new Set(stages.map((stage) => stage.imageSrc).filter((src): src is string => Boolean(src))));
    imageSources.forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (!state.hintVisible) return;
    const timeoutId = window.setTimeout(() => dispatch({ type: "HIDE_HINT" }), 1200);
    return () => window.clearTimeout(timeoutId);
  }, [state.hintVisible]);

  useEffect(() => {
    if (!state.lastFeedback) return;
    const timeoutId = window.setTimeout(() => dispatch({ type: "CLEAR_FEEDBACK" }), 900);
    return () => window.clearTimeout(timeoutId);
  }, [state.lastFeedback]);

  if (state.status === "home") {
    return (
      <>
        <HomeScreen onStart={() => dispatch({ type: "START" })} onShowHowToPlay={() => setHowToOpen(true)} onShowCredits={() => setCreditsOpen(true)} />
        {howToOpen ? <HowToPlayModal onClose={() => setHowToOpen(false)} /> : null}
        {creditsOpen ? <CreditsModal onClose={() => setCreditsOpen(false)} /> : null}
      </>
    );
  }

  if (state.status === "result") {
    return (
      <ResultScreen
        foundCount={state.foundCount}
        totalTapCount={state.totalTapCount}
        hintUsedCount={state.hintUsedCount}
        onRetry={() => dispatch({ type: "START" })}
        onHome={() => dispatch({ type: "HOME" })}
      />
    );
  }

  return (
    <GameScreen
      state={state}
      currentStage={currentStage}
      onCorrect={() => dispatch({ type: "CORRECT" })}
      onWrong={() => dispatch({ type: "WRONG" })}
      onHint={() => dispatch({ type: "USE_HINT" })}
      onExit={() => dispatch({ type: "RESULT" })}
    />
  );
}
