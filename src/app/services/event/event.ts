import { HttpClient } from '@angular/common/http';
import { inject, resource, Service, signal } from '@angular/core';
import { API_URL } from '@app/config/api.config';

import { SseClient } from 'ngx-sse-client';
import { Subscription } from 'rxjs';

export interface ServerEvent<T = unknown> {
  event: string;
  data: T;
}

@Service()
export class EventService {
  private readonly apiUrl = `${inject(API_URL)}/recipes`;

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
        }
      )
      .subscribe({
        next: (event) => {
          if (event.type === 'error') {
            const error = event as ErrorEvent;
            this.connectionError.set(error.message);
            return;
          }

          const message = event as MessageEvent;

          try {
            this.eventState.set({
              value: {
                event: message.type,
                data: JSON.parse(message.data),
              },
            });

            this.connectionError.set(null);
          } catch {
            this.connectionError.set('Invalid SSE payload');
          }
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
