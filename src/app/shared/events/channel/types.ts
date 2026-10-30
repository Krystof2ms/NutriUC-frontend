import { KnownEvent } from "@app/shared/schemas/events";

export type UserEvent = Extract<
  KnownEvent,
  { event: `user.${string}` }
>;

export type RecipeEvent = Extract<
  KnownEvent,
  { event: `recipe.${string}` }
>;