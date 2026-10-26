import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';

export function toDefaultSignal<T>(
  source$: Observable<T | null | undefined>,
  defaultValue: T,
): Signal<T> {
  return toSignal(source$.pipe(map((value) => value ?? defaultValue)), {
    initialValue: defaultValue,
  });
}
