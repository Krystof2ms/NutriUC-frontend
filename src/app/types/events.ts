export const UserEvent = {
  AVATAR_CHANGED: 'user.image_changed',
  AVATAR_REJECTED: 'user.image_rejected',
} as const;

export const RecipeEvent = {
  IMAGE_CHANGED: 'recipe.image_changed',
  IMAGE_REJECTED: 'recipe.image_rejected',
} as const;

export const ServerEvent = {
  SERVER_CONNECTED: 'server.connected',
  SERVER_DISCONNECT: 'server.disconnected',
  SERVER_ERROR: 'server.error',
  SERVER_HEARTBEAT: 'server.heartbeat',
} as const;

export const EventType = {
  ...UserEvent,
  ...RecipeEvent,
  ...ServerEvent,
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];
