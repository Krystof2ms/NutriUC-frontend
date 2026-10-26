import type { ApiError } from "./api-error";

export type ApiResult<T, E extends object> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ApiError<E> | UnknownApiError;
    };

export interface UnknownApiError {
  code: number;
  body: unknown;
}