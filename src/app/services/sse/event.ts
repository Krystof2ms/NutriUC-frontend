import { inject, resource, Service, signal } from '@angular/core';
import { API_URL } from '@app/config/api.config';
import { ServerEvent } from '@app/types/api';
import { SseClient } from 'ngx-sse-client';
import { Subscription } from 'rxjs';
import { EventManager } from '../event-manager/event-manager';

@Service()
export class SSEService {
  private readonly apiUrl = `${inject(API_URL)}/recipes`;

  private readonly eventManager = inject(EventManager);
  private readonly _sseClient = inject(SseClient);

  private readonly eventState = signal<{
    value: ServerEvent | null;
  }>({ value: null });

  readonly events = resource({
    stream: () => this.eventState,
  });

  readonly connectionError = signal<string | null>(null);

  private subscription?: Subscription;

  connect(): void {
    if (this.subscription && !this.subscription.closed) return;

    this.subscription = this._sseClient
      .stream(
        `${this.apiUrl}/events/events`,
        {
          keepAlive: true,
          reconnectionDelay: 3000,
          responseType: 'event',
        },
        {
          withCredentials: true,
        },
      )
      .subscribe({
        next: (message) => {
          this.eventManager.dispatch(message as MessageEvent);
        },

        error: (error: unknown) => {
          this.connectionError.set(
            error instanceof Error ? error.message : 'SSE connection failed',
          );
        },
      });
  }

  disconnect(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;
  }
}
