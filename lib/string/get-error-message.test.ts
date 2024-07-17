import { getErrorMessage } from "./get-error-message";

describe("getErrorMessage", () => {
  let errorMessage: string;

  beforeEach(() => {
    errorMessage = "test error message";
  });

  it("returns error message for Error", () => {
    expect(getErrorMessage(new Error(errorMessage))).toBe(errorMessage);
  });

  it("returns expected string value for string", () => {
    expect(getErrorMessage(errorMessage)).toBe(errorMessage);
  });

  it("returns expected string value for number", () => {
    expect(getErrorMessage(123)).toBe("123");
  });

  it("retuns expected string value for boolean", () => {
    expect(getErrorMessage(true)).toBe("true");
  });

  it("returns `Unhandled Exception` when no message found", () => {
    expect(getErrorMessage({ someData: "test" })).toBe("Unhandled Exception");
  });
});
