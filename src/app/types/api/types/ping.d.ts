import type { operations } from '../schema';

/* /ping */
export type PingApi = operations['root_api_v1_ping_get'];
export type PingResponses = PingApi['responses'];
export type PingResponse = PingResponses[keyof PingResponses];
