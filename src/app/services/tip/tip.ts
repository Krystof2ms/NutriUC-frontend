import { API_URL } from '@app/config/api.config';
import {
  CursorDirection,
  CursorPageTipDTO,
  ErrorResponseMap,
  TipGetByIdResponses,
  TipSearchResponses,
} from '@api/index';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiError } from '@app/types/http';
import { normalizeApi } from '@app/shared/utils/to-normalize-api';

type GetSearchErrors = ApiError<ErrorResponseMap<TipSearchResponses>>;

@Service()
export class TipService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${inject(API_URL)}/tips`;

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

    return normalizeApi<CursorPageTipDTO, GetSearchErrors>(
      this.http.get<CursorPageTipDTO>(`${this.apiUrl}/search`, {
        params,
        withCredentials: mine,
      }),
    );
  }
}
