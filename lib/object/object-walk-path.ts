export function objectWalkPath(item?: AnyObject | null, path?: string) {
  if (!item || !path || !path.trim().length) return item ?? "";

  const keys = path.split(".");

  let current = item;
  for (const key of keys) {
    if (!current) break;

    current = current[key];
  }

  return current ?? "";
}
