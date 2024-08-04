import { cleanUsername } from "./clean-username";

describe("string/cleanUsername", () => {
  it("returns expected string value with already cleaned username", () => {
    expect(cleanUsername("test")).toBe("test");
  });

  it("returns expected string value with @ symbol", () => {
    expect(cleanUsername("@test")).toBe("test");
  });

  it("returns expected string with various cased name", () => {
    expect(cleanUsername("tEsT")).toBe("test");
  });

  it("returns empty string if username is undefined", () => {
    expect(cleanUsername(undefined)).toBe("");
  });
});
