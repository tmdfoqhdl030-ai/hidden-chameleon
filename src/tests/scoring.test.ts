import { describe, expect, it } from "vitest";
import { applyTimePenalty, calculateAccuracy, calculateAnswerScore, getComboBonus, getResultRank } from "../game/scoring";

describe("scoring", () => {
  it("adds base score, time bonus, and combo bonus", () => {
    expect(calculateAnswerScore(42.8, 5)).toBe(254);
  });

  it("uses the highest matching combo bonus", () => {
    expect(getComboBonus(2)).toBe(0);
    expect(getComboBonus(3)).toBe(30);
    expect(getComboBonus(5)).toBe(70);
    expect(getComboBonus(10)).toBe(150);
  });

  it("does not make time negative after a penalty", () => {
    expect(applyTimePenalty(2, 3)).toBe(0);
  });

  it("rounds accuracy and handles zero taps", () => {
    expect(calculateAccuracy(2, 3)).toBe(67);
    expect(calculateAccuracy(0, 0)).toBe(0);
  });

  it("returns a result rank from score and found count", () => {
    expect(getResultRank(3200, 8)).toBe("전설의 관찰자");
    expect(getResultRank(800, 4)).toBe("숨은그림 수색대");
    expect(getResultRank(100, 1)).toBe("도전 중인 탐험가");
  });
});
