import { API_URL } from '@app/config/api.config';
import {
  CursorDirection,
  CursorPageTipDTO,
  ErrorResponseMap,
  MessageResponse,
  TipCreate,
  TipCreateResponses,
  TipDeleteResponses,
  TipSearchResponses,
  TipUpdate,
  TipUpdateResponses,
} from '@api/index';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiError } from '@app/types/http';
import { normalizeApi } from '@app/shared/utils/to-normalize-api';

type GetSearchErrors = ApiError<ErrorResponseMap<TipSearchResponses>>;
type PatchUpdateErrors = ApiError<ErrorResponseMap<TipUpdateResponses>>;
type PostCreateErrors = ApiError<ErrorResponseMap<TipCreateResponses>>;
type DeleteErrors = ApiError<ErrorResponseMap<TipDeleteResponses>>;

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

  update(id: number, data: TipUpdate) {
    return normalizeApi<MessageResponse, PatchUpdateErrors>(
      this.http.patch<MessageResponse>(`${this.apiUrl}/tip/${id}`, data, { withCredentials: true }),
    );
  }

  create(data: TipCreate) {
    return normalizeApi<MessageResponse, PostCreateErrors>(
      this.http.patch<MessageResponse>(`${this.apiUrl}/tip`, data, { withCredentials: true }),
    );
  }

  delete(id: number) {
    return normalizeApi<MessageResponse, DeleteErrors>(
      this.http.delete<MessageResponse>(`${this.apiUrl}/tip/${id}`, { withCredentials: true }),
    );
  }
}
