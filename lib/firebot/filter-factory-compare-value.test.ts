import { ComparisonTypes } from "./filter-constants";
import { compareValue } from "./filter-factory";

describe("compareValue method", () => {
  describe("CompareType.IS", () => {
    it("returns true when string values match", async () => {
      const result = compareValue(ComparisonTypes.IS, "same", "same");
      expect(result).toEqual(true);
    });

    it("returns false when string values do not match", async () => {
      const result = compareValue(ComparisonTypes.IS, "same", "different");
      expect(result).toEqual(false);
    });

    it("returns true when number values match", async () => {
      const result = compareValue(ComparisonTypes.IS, 3621, 3621);
      expect(result).toEqual(true);
    });

    it("returns false when number values do not match", async () => {
      const result = compareValue(ComparisonTypes.IS, 3621, 420);
      expect(result).toEqual(false);
    });
  });

  describe("CompareType.IS_NOT", () => {
    it("returns false when string values match", async () => {
      const result = compareValue(ComparisonTypes.IS_NOT, "same", "same");
      expect(result).toEqual(false);
    });

    it("returns true when string values do not match", async () => {
      const result = compareValue(ComparisonTypes.IS_NOT, "same", "different");
      expect(result).toEqual(true);
    });

    it("returns false when number values match", async () => {
      const result = compareValue(ComparisonTypes.IS_NOT, 3621, 3621);
      expect(result).toEqual(false);
    });

    it("returns true when number values do not match", async () => {
      const result = compareValue(ComparisonTypes.IS_NOT, 3621, 420);
      expect(result).toEqual(true);
    });
  });

  describe("CompareType.CONTAINS", () => {
    it("returns true when string contains substring", async () => {
      const result = compareValue(ComparisonTypes.CONTAINS, "am", "same");
      expect(result).toEqual(true);
    });

    it("returns false when string does not contain substring", async () => {
      const result = compareValue(ComparisonTypes.CONTAINS, "hi", "same");
      expect(result).toEqual(false);
    });

    it("returns true when number contains number", async () => {
      const result = compareValue(ComparisonTypes.CONTAINS, 62, 3621);
      expect(result).toEqual(true);
    });

    it("returns false when string does not contain substring", async () => {
      const result = compareValue(ComparisonTypes.CONTAINS, 420, 3621);
      expect(result).toEqual(false);
    });
  });

  describe("CompareType.DOESNT_CONTAIN", () => {
    it("returns false when string contains substring", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_CONTAIN, "am", "same");
      expect(result).toEqual(false);
    });

    it("returns true when string does not contain substring", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_CONTAIN, "hi", "same");
      expect(result).toEqual(true);
    });

    it("returns false when number contains number", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_CONTAIN, 62, 3621);
      expect(result).toEqual(false);
    });

    it("returns true when number does not contain substring", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_CONTAIN, 420, 3621);
      expect(result).toEqual(true);
    });
  });

  describe("CompareType.STARTS_WITH", () => {
    it("returns true when string starts with substring", async () => {
      const result = compareValue(ComparisonTypes.STARTS_WITH, "sam", "same");
      expect(result).toEqual(true);
    });

    it("returns false when string does not start with substring", async () => {
      const result = compareValue(ComparisonTypes.STARTS_WITH, "hi", "same");
      expect(result).toEqual(false);
    });

    it("returns true when number starts with number", async () => {
      const result = compareValue(ComparisonTypes.STARTS_WITH, 36, 3621);
      expect(result).toEqual(true);
    });

    it("returns false when number does not start with number", async () => {
      const result = compareValue(ComparisonTypes.STARTS_WITH, 420, 3621);
      expect(result).toEqual(false);
    });
  });

  describe("CompareType.DOESNT_START_WITH", () => {
    it("returns false when string starts with substring", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_START_WITH,
        "sam",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns true when string does not start with substring", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_START_WITH,
        "hi",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns false when number starts with number", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_START_WITH, 36, 3621);
      expect(result).toEqual(false);
    });

    it("returns true when number does not start with number", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_START_WITH, 420, 3621);
      expect(result).toEqual(true);
    });
  });

  describe("CompareType.ENDS_WITH", () => {
    it("returns true when string ends with substring", async () => {
      const result = compareValue(ComparisonTypes.ENDS_WITH, "me", "same");
      expect(result).toEqual(true);
    });

    it("returns false when string does not end with substring", async () => {
      const result = compareValue(ComparisonTypes.ENDS_WITH, "hi", "same");
      expect(result).toEqual(false);
    });

    it("returns true when number ends with number", async () => {
      const result = compareValue(ComparisonTypes.ENDS_WITH, 621, 3621);
      expect(result).toEqual(true);
    });

    it("returns false when number does not end with number", async () => {
      const result = compareValue(ComparisonTypes.ENDS_WITH, 420, 3621);
      expect(result).toEqual(false);
    });
  });

  describe("CompareType.DOESNT_END_WITH", () => {
    it("returns false when string ends with substring", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_END_WITH,
        "me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns true when string does not end with substring", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_END_WITH,
        "hi",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns false when number ends with number", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_END_WITH, 621, 3621);
      expect(result).toEqual(false);
    });

    it("returns true when number does not end with number", async () => {
      const result = compareValue(ComparisonTypes.DOESNT_END_WITH, 420, 3621);
      expect(result).toEqual(true);
    });
  });

  describe("CompareType.MATCHES_REGEX_CS", () => {
    it("returns true when string matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX_CS,
        "s.me",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns false when string does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX_CS,
        "s..me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns false when string does not match casing", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX_CS,
        "S.me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns true when number matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX_CS,
        "\\d{4}",
        3621
      );
      expect(result).toEqual(true);
    });

    it("returns false when number does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX_CS,
        "\\d{5}",
        3621
      );
      expect(result).toEqual(false);
    });
  });

  describe("CompareType.DOESNT_MATCH_REGEX_CS", () => {
    it("returns false when string matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX_CS,
        "s.me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns true when string does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX_CS,
        "s..me",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns true when string does not match casing", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX_CS,
        "S.me",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns false when number matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX_CS,
        "\\d{4}",
        3621
      );
      expect(result).toEqual(false);
    });

    it("returns true when number does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX_CS,
        "\\d{5}",
        3621
      );
      expect(result).toEqual(true);
    });
  });

  describe("CompareType.MATCHES_REGEX", () => {
    it("returns true when string matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX,
        "s.me",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns false when string does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX,
        "s..me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns true when string does not match casing", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX,
        "S.me",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns true when number matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX,
        "\\d{4}",
        3621
      );
      expect(result).toEqual(true);
    });

    it("returns false when number does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.MATCHES_REGEX,
        "\\d{5}",
        3621
      );
      expect(result).toEqual(false);
    });
  });

  describe("CompareType.DOESNT_MATCH_REGEX", () => {
    it("returns false when string matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX,
        "s.me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns true when string does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX,
        "s..me",
        "same"
      );
      expect(result).toEqual(true);
    });

    it("returns false when string does not match casing", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX,
        "S.me",
        "same"
      );
      expect(result).toEqual(false);
    });

    it("returns false when number matches regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX,
        "\\d{4}",
        3621
      );
      expect(result).toEqual(false);
    });

    it("returns true when number does not match regex", async () => {
      const result = compareValue(
        ComparisonTypes.DOESNT_MATCH_REGEX,
        "\\d{5}",
        3621
      );
      expect(result).toEqual(true);
    });
  });
});
