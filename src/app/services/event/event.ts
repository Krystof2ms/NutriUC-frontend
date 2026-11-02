import { inject, resource, Service, signal } from '@angular/core';
import { API_URL } from '@app/config/api.config';
import { ServerEvent } from '@app/types/api';
import { Subscription } from 'rxjs';
import { EventManager } from '../event-manager/event-manager';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Service()
export class EventService {
  private readonly apiUrl = `${inject(API_URL)}/events/connect`;

private readonly eventManager = inject(EventManager);

  private socket?: WebSocketSubject<ServerEvent<any>>;

  private readonly eventState = signal<{
    value: ServerEvent<MessageEvent> | null;
  }>({ value: null });

  readonly events = resource({
    stream: () => this.eventState,
  });

  readonly connectionError = signal<string | null>(null);

  private subscription?: Subscription;

  connect(): void {
    if (this.socket && !this.socket.closed) return;

    this.socket = webSocket<ServerEvent>({
      url: this.apiUrl.replace(/^http/, 'ws'),
      deserializer: ({ data }) => JSON.parse(data),
    });

    this.subscription = this.socket.subscribe({
      next: (message) => {
        this.eventManager.dispatch(message);
      },

      error: (error: unknown) => {
        this.connectionError.set(
          error instanceof Error
            ? error.message
            : 'WebSocket connection failed',
        );

        this.socket = undefined;
      },

      complete: () => {
        this.socket = undefined;
      },
    });
  }

  disconnect(): void {
    this.subscription?.unsubscribe();
    this.subscription = undefined;

    this.socket?.complete();
    this.socket = undefined;
  }
}