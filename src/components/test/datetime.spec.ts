import { addDays, addHours, addYears } from "date-fns";

import { formatDatetime } from "../datetime";

const now = new Date("2020-04-01T10:00:00");
const start = new Date("2020-04-16T10:00:00");

describe("datetime", () => {
  describe("with start and without time", () => {
    test("should show only date", () => {
      expect(formatDatetime(start, undefined, undefined, false, now)).toBe(
        "16 Apr"
      );
    });
    test("should show year if not on this year", () => {
      expect(
        formatDatetime(addYears(start, 1), undefined, undefined, false, now)
      ).toBe("16 Apr 2021");
    });
  });
  describe("with start and with time", () => {
    test("should show date and time", () => {
      expect(formatDatetime(start, undefined, undefined, true, now)).toBe(
        "16 Apr 10:00"
      );
    });
    test("should show year if not on this year", () => {
      expect(
        formatDatetime(addYears(start, 1), undefined, undefined, true, now)
      ).toBe("16 Apr 2021 10:00");
    });
  });
  describe("with both start and end, but without time", () => {
    test("should have range in date", () => {
      expect(
        formatDatetime(start, addDays(start, 3), undefined, false, now)
      ).toBe("16 Apr~19 Apr");
    });
  });
  describe("with both start and end, and with time", () => {
    test("should have range in time if on the same date", () => {
      expect(
        formatDatetime(start, addHours(start, 3), undefined, true, now)
      ).toBe("16 Apr 10:00~13:00");
    });
    test("should have range in date if not on the same date", () => {
      expect(
        formatDatetime(start, addDays(start, 3), undefined, true, now)
      ).toBe("16 Apr 10:00~19 Apr 10:00");
    });
  });
});
