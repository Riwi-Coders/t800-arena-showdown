import { describe, expect, it } from "vitest";
import { koPercent } from "@/components/site/data";

describe("K.O. percentage", () => {
  it("is knockout wins divided by total wins, rounded", () => {
    expect(koPercent(14, 11)).toBe(79);
  });
  it("is 0 when a robot has no wins", () => {
    expect(koPercent(0, 0)).toBe(0);
  });
});
