import type { operations } from '../schema';

/* /events/events */
export type EventApi = operations['events_endpoint_api_v1_events_events_get'];
export type EventResponses = EventApi['responses'];
export type EventResponse = EventResponses[keyof EventResponses];

export interface ServerEvent<T = unknown> {
  event: string;
  data: T;
}
