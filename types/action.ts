// ---- Types ----

export type ActionResponse<T> = {
  success: boolean;
  message: string;
  data?: T | null;
  errors?: Record<string, string>;
};

// ---- Helpers ----

export function ErrorResponse(message: string): ActionResponse<never> {
  return { success: false, message: message, data: null };
}

export function SuccessResponse<T>(
  data: T,
  message: string
): ActionResponse<T> {
  return { success: true, message: message, data: data };
}
