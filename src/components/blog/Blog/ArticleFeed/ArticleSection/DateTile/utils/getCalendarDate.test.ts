import { describe, expect, it } from "vitest";
import { getCalendarDate } from "./getCalendarDate";

describe("getCalendarDate", () => {
  describe("when given a publication date", () => {
    it("splits it into day, short month and year", () => {
      expect(getCalendarDate("2025-04-02T08:15:00.000Z")).toEqual({
        day: "2",
        month: "Apr",
        year: "2025",
      });
    });
  });

  describe("when the article was published late on New Year's Eve, UTC", () => {
    it("uses the date in Poland", () => {
      expect(getCalendarDate("2024-12-31T23:30:00.000Z")).toEqual({
        day: "1",
        month: "Jan",
        year: "2025",
      });
    });
  });
});
