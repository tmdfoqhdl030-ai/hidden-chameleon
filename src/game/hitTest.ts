import type { AnswerZone } from "./gameTypes";

export type PercentPoint = {
  x: number;
  y: number;
};

export function pointFromClientPosition(
  clientX: number,
  clientY: number,
  rect: Pick<DOMRect, "left" | "top" | "width" | "height">
): PercentPoint {
  return {
    x: ((clientX - rect.left) / rect.width) * 100,
    y: ((clientY - rect.top) / rect.height) * 100
  };
}

export function isPointInZone(point: PercentPoint, zone: AnswerZone): boolean {
  if (zone.type === "circle") {
    const dx = point.x - zone.x;
    const dy = point.y - zone.y;
    return Math.sqrt(dx * dx + dy * dy) <= zone.radius;
  }

  return (
    point.x >= zone.x &&
    point.x <= zone.x + zone.width &&
    point.y >= zone.y &&
    point.y <= zone.y + zone.height
  );
}

export function hitTest(point: PercentPoint, zones: AnswerZone[]): boolean {
  return zones.some((zone) => isPointInZone(point, zone));
}

export function getZoneCenter(zone: AnswerZone): PercentPoint {
  if (zone.type === "circle") {
    return { x: zone.x, y: zone.y };
  }

  return {
    x: zone.x + zone.width / 2,
    y: zone.y + zone.height / 2
  };
}
