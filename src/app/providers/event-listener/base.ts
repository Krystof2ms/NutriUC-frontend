import { EventChannel } from "@app/shared/events/channel/base";
import { Subscription } from "rxjs";

export abstract class EventListener {
  protected readonly subscriptions = new Subscription();

  protected listen<T>(channel: EventChannel<T>, handler: (event: T) => void): void {
    this.subscriptions.add(channel.events$.subscribe(handler));
  }

  destroy(): void {
    this.subscriptions.unsubscribe();
  }
}
