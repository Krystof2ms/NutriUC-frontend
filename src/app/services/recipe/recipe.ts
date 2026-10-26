import {
  CursorDirection,
  CursorPageRecipeDTO,
  ErrorResponseMap,
  RecipeDTO,
  RecipeGetByIdResponses,
  RecipeSearchResponses,
} from '@api/index';
import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '@app/config/api.config';
import { ApiError } from '@app/types/http';
import { normalizeApi } from '@app/shared/utils/to-normalize-api';

type GetSearchErrors = ApiError<ErrorResponseMap<RecipeSearchResponses>>;
type GetRecipeErrors = ApiError<ErrorResponseMap<RecipeGetByIdResponses>>;

@Service()
export class RecipeService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${inject(API_URL)}/recipes`;

  search(
    name?: string,
    category?: string,
    cursor?: number,
    direction?: CursorDirection,
    limit: number = 12,
    mine: boolean = false,
  ) {
    let params = new HttpParams().set('limit', limit);

    if (name !== undefined) {
      params = params.set('name', name);
    }

    if (category !== undefined) {
      params = params.set('category', category);
    }

    if (cursor !== undefined) {
      params = params.set('cursor', cursor);
    }

    if (direction !== undefined) {
      params = params.set('dir', direction);
    }

    if (mine) {
      params = params.set('mine', mine);
    }

    return normalizeApi<CursorPageRecipeDTO, GetSearchErrors>(
      this.http.get<CursorPageRecipeDTO>(`${this.apiUrl}/search`, {
        params,
        withCredentials: mine,
      }),
    );
  }

  getById(id: string) {
    return normalizeApi<RecipeDTO, GetRecipeErrors>(
      this.http.get<RecipeDTO>(`${this.apiUrl}/recipe/${id}`),
    );
  }
}
