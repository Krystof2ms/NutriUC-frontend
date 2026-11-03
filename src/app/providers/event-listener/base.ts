import { EventChannel } from '@app/shared/events/channel/base';
import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export abstract class EventListener implements OnDestroy {
  protected readonly subscriptions = new Subscription();

  protected listen<T>(channel: EventChannel<T>, handler: (event: T) => void): void {
    this.subscriptions.add(channel.events$.subscribe(handler));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
