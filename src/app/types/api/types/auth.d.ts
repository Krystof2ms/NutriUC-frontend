import type { components, operations } from '../schema';

export type AuthResponse = components['schemas']['AuthResponse'];

export type LoginForm = components['schemas']['LoginForm'];

/* /auth/login */
export type AuthLoginApi = operations['login_api_v1_auth_login_post'];
export type AuthLoginResponses = AuthLoginApi['responses'];
export type AuthLoginResponse = AuthLoginResponses[keyof AuthLoginResponses];

/* /auth/refresh */
export type AuthRefreshApi = operations['refresh_api_v1_auth_refresh_post'];
export type AuthRefreshResponses = AuthRefreshApi['responses'];
export type AuthRefreshResponse = AuthRefreshResponses[keyof AuthRefreshResponses];

/* /auth/logout */
export type AuthLogoutApi = operations['logout_api_v1_auth_logout_post'];
export type AuthLogoutResponses = AuthLogoutApi['responses'];
export type AuthLogoutResponse = AuthLogoutResponses[keyof AuthLogoutResponses];
