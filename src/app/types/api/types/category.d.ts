import type { components, operations } from '../schema';

export type CategoryType = components['schemas']['CategoryType'];

/* /categories/names */
export type CategoryNamesApi = operations['getNames_api_v1_categories_names_get'];
export type CategoryNamesResponses = CategoryNamesApi['responses'];
export type CategoryNamesResponse = CategoryNamesResponses[keyof CategoryNamesResponses];
