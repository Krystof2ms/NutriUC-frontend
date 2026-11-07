import type { operations } from '../schema';

export interface ServerEvent<T = unknown> {
  event: string;
  data: T;
}
