// ---- Types ----

export type ActionResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

// ---- Helpers ----

export function createErrorResult(message: string): ActionResult<never> {
  return { success: false, message: message, data: null };
}

export function createSuccessResult<T>(
  data: T,
  message: string
): ActionResult<T> {
  return { success: true, message: message, data: data };
}
