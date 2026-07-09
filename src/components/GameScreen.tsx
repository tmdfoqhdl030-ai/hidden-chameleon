import { useMemo, useState } from "react";
import type { GameState, Stage } from "../game/gameTypes";
import type { PercentPoint } from "../game/hitTest";
import { FeedbackToast } from "./FeedbackToast";
import { Hud } from "./Hud";
import { StageCanvas } from "./StageCanvas";

type GameScreenProps = {
  state: GameState;
  currentStage?: Stage;
  onCorrect: () => void;
  onWrong: () => void;
  onHint: () => void;
  onExit: () => void;
};

export function GameScreen({ state, currentStage, onCorrect, onWrong, onHint, onExit }: GameScreenProps) {
  const [wrongPoint, setWrongPoint] = useState<PercentPoint | undefined>();
  const [correctPulse, setCorrectPulse] = useState<PercentPoint | undefined>();
  const guideLabel = useMemo(() => "위치 가이드", []);

  if (!currentStage) {
    return (
      <main className="screen gameScreen">
        <p className="emptyStage">관찰할 장면을 불러올 수 없습니다.</p>
        <button type="button" className="secondaryButton" aria-label="홈으로 이동" onClick={onExit}>
          돌아가기
        </button>
      </main>
    );
  }

  return (
    <main className="screen gameScreen">
      <Hud state={state} />
      <FeedbackToast feedback={state.lastFeedback} />
      <div className="comboBanner comboBannerEmpty" aria-hidden="true"> </div>
      <StageCanvas
        stage={currentStage}
        hintVisible={state.hintVisible}
        wrongPoint={wrongPoint}
        correctPulse={correctPulse}
        onCorrect={(point) => {
          setCorrectPulse(point);
          window.setTimeout(() => setCorrectPulse(undefined), 360);
          onCorrect();
        }}
        onWrong={(point) => {
          setWrongPoint(point);
          window.setTimeout(() => setWrongPoint(undefined), 520);
          onWrong();
        }}
      />
      <div className="actionBar">
        <button type="button" className="secondaryButton" aria-label="위치 가이드 보기" onClick={onHint}>
          {guideLabel}
        </button>
        <button type="button" className="ghostButton" aria-label="관찰을 마치고 요약 보기" onClick={onExit}>
          관찰 마치기
        </button>
      </div>
    </main>
  );
}
