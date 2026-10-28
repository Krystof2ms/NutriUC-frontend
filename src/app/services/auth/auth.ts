import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { API_URL } from '@app/config/api.config';
import { normalizeApi } from '@app/shared/utils/to-normalize-api';
import {
  AuthLoginResponses,
  AuthLogoutResponses,
  AuthResponse,
  ErrorResponseMap,
  MessageResponse,
  UserMeResponses,
  UserSummaryMe,
} from '@app/types/api';
import { AuthStatus } from '@app/types/auth';
import { ApiError } from '@app/types/http';
import { map, Observable, of } from 'rxjs';

type GetMeErrors = ApiError<ErrorResponseMap<UserMeResponses>>;
type LoginErrors = ApiError<ErrorResponseMap<AuthLoginResponses>>;
type LogoutErrors = ApiError<ErrorResponseMap<AuthLogoutResponses>>;

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly userApiUrl = `${inject(API_URL)}/users`;
  private readonly authApiUrl = `${inject(API_URL)}/auth`;

  readonly currentUser = signal<UserSummaryMe | null>(null);
  readonly authStatus = signal<AuthStatus>(AuthStatus.Checking);

  readonly isAuthenticated = computed(() => this.authStatus() === AuthStatus.Authenticated);

  getMe() {
    return normalizeApi<UserSummaryMe, GetMeErrors>(
      this.http.get<UserSummaryMe>(`${this.userApiUrl}/me`, {
        withCredentials: true,
      }),
    );
  }

  ensureCurrentUser(): Observable<UserSummaryMe | null> {
    if (this.authStatus() === AuthStatus.Authenticated) {
      return of(this.currentUser());
    }

    return this.getMe().pipe(
      map((user): UserSummaryMe | null => {
        if (user.success) {
          this.currentUser.set(user.data);
          this.authStatus.set(AuthStatus.Authenticated);
          return user.data;
        }

        this.currentUser.set(null);
        this.authStatus.set(AuthStatus.Unauthenticated);
        return null;
      }),
    );
  }

  invalidateData() {
    this.authStatus.set(AuthStatus.Checking);
    this.currentUser.set(null);
  }

  login(email: string, password: string) {
    const body = new HttpParams().set('email', email).set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return normalizeApi<MessageResponse<AuthResponse>, LoginErrors>(
      this.http.post<MessageResponse<AuthResponse>>(`${this.authApiUrl}/login`, body.toString(), {
        headers,
        withCredentials: true,
      }),
    );
  }

  logout() {
    return normalizeApi<MessageResponse, LogoutErrors>(
      this.http.post<MessageResponse>(`${this.authApiUrl}/logout`, null, {
        withCredentials: true,
      }),
    );
  }
}
