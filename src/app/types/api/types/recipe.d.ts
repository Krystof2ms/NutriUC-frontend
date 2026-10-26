import type { components, operations } from '../schema';
import type { CursorPage } from './responses';

export type RecipeDTO = components['schemas']['RecipeDTO'];
export type RecipeCreate = components['schemas']['RecipeCreate'];
export type RecipeUpdate = components['schemas']['RecipeUpdate'];
export type Ingredient = components['schemas']['Ingredient'];
export type Instruction = components['schemas']['Instruction'];
export type CursorPageRecipeDTO = CursorPage<RecipeDTO>;
export type RecipeCursorPage = CursorPageRecipeDTO;
export type RecipeAvatarUpdate =
  components['schemas']['Body_updateAvatar_api_v1_recipes_recipe__id__img_put'];

/* /recipes/search */
export type RecipeSearchApi = operations['findDTO_api_v1_recipes_search_get'];
export type RecipeSearchResponses = RecipeSearchApi['responses'];
export type RecipeSearchResponse = RecipeSearchResponses[keyof RecipeSearchResponses];

/* /recipes/recipe/{id} */
export type RecipeGetByIdApi = operations['findId_api_v1_recipes_recipe__id__get'];
export type RecipeGetByIdResponses = RecipeGetByIdApi['responses'];
export type RecipeGetByIdResponse = RecipeGetByIdResponses[keyof RecipeGetByIdResponses];

/* /recipes/recipe/{id} */
export type RecipeDeleteApi = operations['delete_api_v1_recipes_recipe__id__delete'];
export type RecipeDeleteResponses = RecipeDeleteApi['responses'];
export type RecipeDeleteResponse = RecipeDeleteResponses[keyof RecipeDeleteResponses];

/* /recipes/recipe/{id} */
export type RecipeUpdateApi = operations['update_api_v1_recipes_recipe__id__patch'];
export type RecipeUpdateResponses = RecipeUpdateApi['responses'];
export type RecipeUpdateResponse = RecipeUpdateResponses[keyof RecipeUpdateResponses];

/* /recipes/recipe/{id}/img */
export type RecipeGetImageApi = operations['getImage_api_v1_recipes_recipe__id__img_get'];
export type RecipeGetImageResponses = RecipeGetImageApi['responses'];
export type RecipeGetImageResponse = RecipeGetImageResponses[keyof RecipeGetImageResponses];

/* /recipes/recipe/{id}/img */
export type RecipeUpdateImageApi = operations['updateAvatar_api_v1_recipes_recipe__id__img_put'];
export type RecipeUpdateImageResponses = RecipeUpdateImageApi['responses'];
export type RecipeUpdateImageResponse = RecipeUpdateImageResponses[keyof RecipeUpdateImageResponses];

/* /recipes/recipe/{id}/img */
export type RecipeDeleteImageApi = operations['deleteAvatar_api_v1_recipes_recipe__id__img_delete'];
export type RecipeDeleteImageResponses = RecipeDeleteImageApi['responses'];
export type RecipeDeleteImageResponse = RecipeDeleteImageResponses[keyof RecipeDeleteImageResponses];

/* /recipes/recipe */
export type RecipeCreateApi = operations['create_api_v1_recipes_recipe_post'];
export type RecipeCreateResponses = RecipeCreateApi['responses'];
export type RecipeCreateResponse = RecipeCreateResponses[keyof RecipeCreateResponses];
