import { UserEvent } from '@app/types/events';
import { z } from 'zod';

export const UserAvatarChangedSchema = z.object({
  event: z.literal(UserEvent.AVATAR_CHANGED),
  data: z.object({
    message: z.string(),
  }),
});

export const UserAvatarRejectedSchema = z.object({
  event: z.literal(UserEvent.AVATAR_REJECTED),
  data: z.object({
    detail: z.string(),
  }),
});
