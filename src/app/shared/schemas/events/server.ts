import { ServerEvent } from '@app/types/events';
import { z } from 'zod';

export const serverConnectedSchema = z.object({
  event: z.literal(ServerEvent.SERVER_CONNECTED),
  data: z.object({
    status: z.string(),
  }),
});

export const serverDisconnectSchema = z.object({
  event: z.literal(ServerEvent.SERVER_DISCONNECT),
  data: z.object({
    status: z.string(),
    reason: z.string(),
  }),
});

export const serverErrorSchema = z.object({
  event: z.literal(ServerEvent.SERVER_ERROR),
  data: z.object({
    detail: z.string(),
  }),
});

export const serverHeartbeatSchema = z.object({
  event: z.literal(ServerEvent.SERVER_HEARTBEAT),
  data: z.object({
    status: z.string(),
  }),
});
