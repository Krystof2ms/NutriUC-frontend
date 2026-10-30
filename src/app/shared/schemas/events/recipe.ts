import { RecipeEvent } from '@app/types/events';
import { z } from 'zod';

export const RecipeImageChangedSchema = z.object({
  event: z.literal(RecipeEvent.IMAGE_CHANGED),
  data: z.object({
    message: z.string(),
  }),
});

export const RecipeImageRejectedSchema = z.object({
  event: z.literal(RecipeEvent.IMAGE_REJECTED),
  data: z.object({
    detail: z.string(),
  }),
});
