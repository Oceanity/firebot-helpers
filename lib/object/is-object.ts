
export const isObject = (item: any): item is AnyObject => 
  !!item && typeof item === "object" && !Array.isArray(item);