import { isObject } from ".";

export function mergeObjects(obj1: AnyObject, obj2: AnyObject): AnyObject {
  const result: AnyObject = { ...obj1 }; // Start with a shallow copy of obj1

  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (isObject(obj2[key]) && isObject(obj1[key])) {
        result[key] = mergeObjects(obj1[key], obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    }
  }

  return result;
}