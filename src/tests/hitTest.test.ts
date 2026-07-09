import { describe, expect, it } from "vitest";
import { hitTest, pointFromClientPosition } from "../game/hitTest";
import type { AnswerZone } from "../game/gameTypes";

describe("hitTest", () => {
  it("detects a point inside a circle answer zone", () => {
    const zones: AnswerZone[] = [{ type: "circle", x: 50, y: 50, radius: 10 }];
    expect(hitTest({ x: 56, y: 58 }, zones)).toBe(true);
  });

  it("rejects a point outside a circle answer zone", () => {
    const zones: AnswerZone[] = [{ type: "circle", x: 50, y: 50, radius: 10 }];
    expect(hitTest({ x: 70, y: 50 }, zones)).toBe(false);
  });

  it("detects a point inside a rect answer zone", () => {
    const zones: AnswerZone[] = [{ type: "rect", x: 20, y: 30, width: 15, height: 20 }];
    expect(hitTest({ x: 25, y: 45 }, zones)).toBe(true);
  });

  it("rejects a point outside a rect answer zone", () => {
    const zones: AnswerZone[] = [{ type: "rect", x: 20, y: 30, width: 15, height: 20 }];
    expect(hitTest({ x: 36, y: 45 }, zones)).toBe(false);
  });

  it("converts client coordinates into responsive percentage coordinates", () => {
    const point = pointFromClientPosition(150, 240, { left: 50, top: 40, width: 200, height: 400 });
    expect(point).toEqual({ x: 50, y: 50 });
  });
});
