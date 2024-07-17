import { formatMsToTimecode } from "./format-ms-to-timecode";

describe("msToFormattedString", () => {
  it("returns expected string value for small number", () => {
    expect(formatMsToTimecode(1000)).toBe("0:01");
  });

  it("returns expected string with floored ms", () => {
    expect(formatMsToTimecode(956)).toBe("0:00");
    expect(formatMsToTimecode(1240)).toBe("0:01");
  });

  it("includes hours in string value when enabled", () => {
    expect(formatMsToTimecode(60000, true)).toBe("0:01:00");
  });

  it("returns expected string value for large number", () => {
    expect(formatMsToTimecode(3600000)).toBe("1:00:00");
  });

  it("returns expected string value for silly number", () => {
    expect(formatMsToTimecode(817000)).toBe("13:37");
  });

  it("returns 0:00 if ms is -1", () => {
    expect(formatMsToTimecode(-1)).toBe("0:00");
  });

  it("returns 0:00:00 if ms is -1 and showHours is true", () => {
    expect(formatMsToTimecode(-1, true)).toBe("0:00:00");
  });
});
