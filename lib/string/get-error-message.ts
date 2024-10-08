export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "object" && error !== null) {
    return "Unhandled Exception";
  }
  return String(error);
};
