
import { Subject, Observable } from 'rxjs';

export abstract class EventChannel<T> {
  private readonly subject = new Subject<T>();

  readonly events$: Observable<T> = this.subject.asObservable();

  dispatch(event: T): void {
    this.subject.next(event);
  }
}
