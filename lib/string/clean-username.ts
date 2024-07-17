export const cleanUsername = (username?: string): string =>
  username ? username.trim().replace(/^@/, "").toLowerCase() : "";
