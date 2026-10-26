import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_URL } from '@app/config/api.config';
import { normalizeApi } from '@app/shared/utils/to-normalize-api';
import {
  ErrorResponseMap,
  MessageResponse,
  UserStats,
  UserStatsResponses,
  UserUpdate,
  UserUpdateAvatarResponses,
  UserUpdateMeResponses,
} from '@app/types/api';
import { ApiError } from '@app/types/http';

type GetStatsErrors = ApiError<ErrorResponseMap<UserStatsResponses>>;
type UpdateErrors = ApiError<ErrorResponseMap<UserUpdateMeResponses>>;
type UpdateAvatarErrors = ApiError<ErrorResponseMap<UserUpdateAvatarResponses>>;

type Crop = {
  x: number;
  y: number;
  size: number;
};

@Service()
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${inject(API_URL)}/users`;

  getStats() {
    return normalizeApi<UserStats, GetStatsErrors>(
      this.http.get<UserStats>(`${this.apiUrl}/me/stats`, {
        withCredentials: true,
      }),
    );
  }

  updateData(update: UserUpdate) {
    return normalizeApi<MessageResponse, UpdateErrors>(
      this.http.patch<MessageResponse>(`${this.apiUrl}/me`, update, { withCredentials: true }),
    );
  }

  updateAvatarBlob(avatar: Blob, crop: Crop = { x: 0, y: 0, size: 1 }) {
    const formData = new FormData();
    const params = crop
      ? new HttpParams().set('x', crop.x).set('y', crop.y).set('size', crop.size)
      : new HttpParams();

    formData.append('avatar', avatar, 'avatar.webp');

    return normalizeApi<MessageResponse, UpdateAvatarErrors>(
      this.http.put<MessageResponse>(`${this.apiUrl}/me/avatar`, formData, {
        withCredentials: true,
        params,
      }),
    );
  }
}
