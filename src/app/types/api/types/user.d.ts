import type { components, operations } from '../schema';

export type BaseUser = components['schemas']['BaseUser'];
export type UserSummary = components['schemas']['UserSummary'];
export type UserSummaryMe = components['schemas']['UserSummaryMe'];
export type UserCreate = components['schemas']['UserCreate'];
export type UserUpdate = components['schemas']['UserUpdate'];
export type UserAvatarUpdate =
  components['schemas']['Body_updateAvatar_api_v1_users_me_avatar_put'];
export type LoginForm = components['schemas']['LoginForm'];
export type UserStats = components['schemas']['UserStats'];

/* /users/me/stats */
export type UserStatsApi = operations['summary_api_v1_users_me_stats_get'];
export type UserStatsResponses = UserStatsApi['responses'];
export type UserStatsResponse = UserStatsResponses[keyof UserStatsResponses];

/* /users/me */
export type UserMeApi = operations['me_api_v1_users_me_get'];
export type UserMeResponses = UserMeApi['responses'];
export type UserMeResponse = UserMeResponses[keyof UserMeResponses];

/* /users/me */
export type UserUpdateMeApi = operations['update_api_v1_users_me_patch'];
export type UserUpdateMeResponses = UserUpdateMeApi['responses'];
export type UserUpdateMeResponse = UserUpdateMeResponses[keyof UserUpdateMeResponses];

/* /users/me/avatar */
export type UserUpdateAvatarApi = operations['updateAvatar_api_v1_users_me_avatar_put'];
export type UserUpdateAvatarResponses = UserUpdateAvatarApi['responses'];
export type UserUpdateAvatarResponse = UserUpdateAvatarResponses[keyof UserUpdateAvatarResponses];

/* /users/me/avatar */
export type UserDeleteAvatarApi = operations['deleteAvatar_api_v1_users_me_avatar_delete'];
export type UserDeleteAvatarResponses = UserDeleteAvatarApi['responses'];
export type UserDeleteAvatarResponse = UserDeleteAvatarResponses[keyof UserDeleteAvatarResponses];

/* /users/{id}/avatar */
export type UserGetAvatarApi = operations['avatar_api_v1_users__id__avatar_get'];
export type UserGetAvatarResponses = UserGetAvatarApi['responses'];
export type UserGetAvatarResponse = UserGetAvatarResponses[keyof UserGetAvatarResponses];

/* /users/ */
export type UserCreateApi = operations['create_api_v1_users__post'];
export type UserCreateResponses = UserCreateApi['responses'];
export type UserCreateResponse = UserCreateResponses[keyof UserCreateResponses];
