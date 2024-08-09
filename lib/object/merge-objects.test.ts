import { mergeObjects } from ".";

describe("object/merge-objects", () => {
  it("merges two objects", () => {
    const obj1 = { foo: "bar" };
    const obj2 = { baz: "qux" };
    const expected = { foo: "bar", baz: "qux" };
    expect(mergeObjects(obj1, obj2)).toEqual(expected);
  });

  it("merges two nested objects", () => {
    const obj1 = { foo: { bar: "baz" } };
    const obj2 = { foo: { qux: "quux" } };
    const expected = { foo: { bar: "baz", qux: "quux" } };
    expect(mergeObjects(obj1, obj2)).toEqual(expected);
  });

  it("overwrites duplicate keys", () => {
    const obj1 = { foo: "bar" };
    const obj2 = { foo: "baz" };
    const expected = { foo: "baz" };
    expect(mergeObjects(obj1, obj2)).toEqual(expected);
  });
})