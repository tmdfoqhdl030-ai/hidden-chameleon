import type { GameState } from "../game/gameTypes";

type HudProps = {
  state: GameState;
};

export function Hud({ state }: HudProps) {
  return (
    <header className="hud" aria-label="관찰 현황">
      <div className="hudItem">
        <span>관찰 장면</span>
        <strong>{state.foundCount + 1}</strong>
      </div>
      <div className="hudItem">
        <span>발견한 형태</span>
        <strong>{state.foundCount}</strong>
      </div>
      <div className="hudItem">
        <span>살펴본 위치</span>
        <strong>{state.totalTapCount}</strong>
      </div>
      <div className="hudItem">
        <span>가이드 사용</span>
        <strong>{state.hintUsedCount}</strong>
      </div>
    </header>
  );
}
