export const UserEvent = {
  AVATAR_CHANGED: 'user.image_changed',
  AVATAR_REJECTED: 'user.image_rejected',
} as const;

export const RecipeEvent = {
  IMAGE_CHANGED: 'recipe.image_changed',
  IMAGE_REJECTED: 'recipe.image_rejected',
} as const;

export const EventType = {
  ...UserEvent,
  ...RecipeEvent,
} as const;

export type EventType =
  (typeof EventType)[keyof typeof EventType];