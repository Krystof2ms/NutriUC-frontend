import type { components, operations } from '../schema';
import type { CursorPage } from './responses';

export type TipDTO = components['schemas']['TipDTO'];
export type TipCreate = components['schemas']['TipCreate'];
export type TipUpdate = components['schemas']['TipUpdate'];
export type CursorPageTipDTO = CursorPage<TipDTO>;
export type TipCursorPage = CursorPageTipDTO;

/* /tips/search */
export type TipSearchApi = operations['findDTO_api_v1_tips_search_get'];
export type TipSearchResponses = TipSearchApi['responses'];
export type TipSearchResponse = TipSearchResponses[keyof TipSearchResponses];

/* /tips/tip/{id} */
export type TipGetByIdApi = operations['findId_api_v1_tips_tip__id__get'];
export type TipGetByIdResponses = TipGetByIdApi['responses'];
export type TipGetByIdResponse = TipGetByIdResponses[keyof TipGetByIdResponses];

/* /tips/tip/{id} */
export type TipDeleteApi = operations['delete_api_v1_tips_tip__id__delete'];
export type TipDeleteResponses = TipDeleteApi['responses'];
export type TipDeleteResponse = TipDeleteResponses[keyof TipDeleteResponses];

/* /tips/tip/{id} */
export type TipUpdateApi = operations['update_api_v1_tips_tip__id__patch'];
export type TipUpdateResponses = TipUpdateApi['responses'];
export type TipUpdateResponse = TipUpdateResponses[keyof TipUpdateResponses];

/* /tips/tip */
export type TipCreateApi = operations['create_api_v1_tips_tip_post'];
export type TipCreateResponses = TipCreateApi['responses'];
export type TipCreateResponse = TipCreateResponses[keyof TipCreateResponses];
