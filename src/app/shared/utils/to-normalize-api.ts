import { HttpErrorResponse } from '@angular/common/http';
import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiError, ApiResult, UnknownApiError } from '@app/types/http';
import { catchError, map, Observable, of } from 'rxjs';

export function toNormalizeApi<T, E extends object>(
  source$: Observable<T>,
  defaultValue: T,
): Signal<ApiResult<T, E>>;

export function toNormalizeApi<T, E extends object>(
  source$: Observable<T>,
): Signal<ApiResult<T, E> | undefined>;

export function toNormalizeApi<T, E extends object>(
  source$: Observable<T>,
  defaultValue?: T,
): Signal<ApiResult<T, E> | undefined> {
  const normalized$ = normalizeApi<T, E>(source$);

  if (defaultValue === undefined) {
    return toSignal(normalized$, {
      initialValue: undefined,
    });
  }

  return toSignal(normalized$, {
    initialValue: {
      success: true,
      data: defaultValue,
    },
  });
}

export function normalizeApi<T, E extends object>(
  source$: Observable<T>,
): Observable<ApiResult<T, E>> {
  return source$.pipe(
    map((data): ApiResult<T, E> => ({
      success: true,
      data,
    })),
    catchError((error: unknown) =>
      of({
        success: false,
        error: normalizeError<E>(error),
      } satisfies ApiResult<T, E>),
    ),
  );
}

function normalizeError<E extends object>(error: unknown): ApiError<E> | UnknownApiError {
  if (!(error instanceof HttpErrorResponse)) {
    return { code: 0, body: error };
  }

  return {
    code: error.status,
    body: error.error,
  } as ApiError<E>;
}
