import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserEventListener } from '@app/providers/event-listener';

@Component({
  imports: [RouterOutlet],
  selector: 'app-user-layout',
  template: '<router-outlet />'
})
export class UserLayout {
  private readonly _listener = inject(UserEventListener);
}
