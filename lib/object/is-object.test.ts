import { isObject } from ".";

describe("object/isObject", () => {
  it("should return true if item is a raw object", () => {
    expect(isObject({})).toBeTruthy();
  });

  it("should return true if item is an object created via Object.create", () => {
    expect(isObject(Object.create(null))).toBeTruthy();
  });

  it("should return true if item is a specialized object type", () => {
    expect(isObject(new Date())).toBeTruthy();
  });

  it("should return false if item is array", () => {
    expect(isObject([])).toBeFalsy();
  })

  it("should return false if item is null", () => {
    expect(isObject(null)).toBeFalsy();
  });

  it("should return false if item is undefined", () => {
    expect(isObject(undefined)).toBeFalsy();
  });

  it("should return false if item is a number", () => {
    expect(isObject(1)).toBeFalsy();
  });

  it("should return false if item is a string", () => {
    expect(isObject("test")).toBeFalsy();
  });

  it("should return false if item is true", () => {
    expect(isObject(true)).toBeFalsy();
  });

  it("should return false if item is false", () => {
    expect(isObject(false)).toBeFalsy();
  });
});
