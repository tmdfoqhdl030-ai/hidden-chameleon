import type { GameState } from "../game/gameTypes";

type FeedbackToastProps = {
  feedback: GameState["lastFeedback"];
};

export function FeedbackToast({ feedback }: FeedbackToastProps) {
  const label = feedback === "correct" ? "숨은 형태를 찾았습니다." : feedback === "wrong" ? "다른 위치도 살펴보세요." : feedback === "hint" ? "위치 가이드를 표시했습니다." : " ";

  return (
    <div className={`feedbackToast ${feedback ?? "empty"}`} role="status" aria-live="polite" aria-hidden={!feedback}>
      {label}
    </div>
  );
}
