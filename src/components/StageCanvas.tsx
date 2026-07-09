import { useState, type CSSProperties, type PointerEvent } from "react";
import { getZoneCenter, hitTest, pointFromClientPosition } from "../game/hitTest";
import type { PercentPoint } from "../game/hitTest";
import type { Stage } from "../game/gameTypes";

type StageCanvasProps = {
  stage: Stage;
  hintVisible: boolean;
  wrongPoint?: PercentPoint;
  correctPulse?: PercentPoint;
  onCorrect: (point: PercentPoint) => void;
  onWrong: (point: PercentPoint) => void;
};

const debugHitbox = import.meta.env.VITE_DEBUG_HITBOX === "true";

function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function StageCanvas({ stage, hintVisible, wrongPoint, correctPulse, onCorrect, onWrong }: StageCanvasProps) {
  const [baseImageFailed, setBaseImageFailed] = useState(false);
  const answerCenter = stage.answerZones[0] ? getZoneCenter(stage.answerZones[0]) : undefined;
  const svgSrc = stage.svg ? svgToDataUrl(stage.svg) : undefined;
  const src = baseImageFailed ? svgSrc : stage.imageSrc ?? svgSrc;
  const overlayStyle: CSSProperties = {
    opacity: stage.camouflageOpacity ?? 0.58
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const point = pointFromClientPosition(event.clientX, event.clientY, rect);
    if (hitTest(point, stage.answerZones)) {
      onCorrect(point);
    } else {
      onWrong(point);
    }
  };

  if (!src) {
    return <div className="emptyStage">관찰 장면을 불러올 수 없습니다.</div>;
  }

  return (
    <div className="stageShell">
      <div className="stageTitle">
        <strong>{stage.title}</strong>
        <span>관찰 난도 {stage.difficulty}</span>
      </div>
      <div className="stageCanvas" role="button" tabIndex={0} aria-label="위장 형태 관찰 영역" onPointerDown={handlePointerDown}>
        <img className="stageBaseImage" src={src} alt={`${stage.title} 배경과 위장된 형태`} draggable={false} onError={() => setBaseImageFailed(true)} />
        {stage.imageSrc && svgSrc && !baseImageFailed ? <img className="stageOverlayImage" src={svgSrc} alt="" aria-hidden="true" draggable={false} style={overlayStyle} /> : null}
        {stage.imageSrc && !baseImageFailed ? <span className="photoVignette" aria-hidden="true" /> : null}
        {hintVisible && answerCenter ? <span className="hintRing" style={{ left: `${answerCenter.x}%`, top: `${answerCenter.y}%` }} /> : null}
        {correctPulse ? <span className="correctPulse" style={{ left: `${correctPulse.x}%`, top: `${correctPulse.y}%` }} /> : null}
        {wrongPoint ? <span className="wrongMark" style={{ left: `${wrongPoint.x}%`, top: `${wrongPoint.y}%` }}>X</span> : null}
        {debugHitbox ? (
          <>
            <div className="debugPanel">
              {stage.id} · 관찰 난도 {stage.difficulty} · 위장 {Math.round((stage.camouflageOpacity ?? 0.58) * 100)}%
            </div>
            {stage.answerZones.map((zone, index) =>
              zone.type === "circle" ? (
                <span
                  key={index}
                  className="debugCircle"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.radius * 2}%`,
                    height: `${zone.radius * 2}%`
                  }}
                />
              ) : (
                <span
                  key={index}
                  className="debugRect"
                  style={{
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.width}%`,
                    height: `${zone.height}%`
                  }}
                />
              )
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

