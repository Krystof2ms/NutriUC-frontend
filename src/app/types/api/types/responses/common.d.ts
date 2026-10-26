import type { components } from '../../schema';

export type MessageResponse = components['schemas']['MessageResponse'];

export interface CursorPage<T> {
  data: T[];
  next_cursor: number | null;
  previous_cursor: number | null;
}
