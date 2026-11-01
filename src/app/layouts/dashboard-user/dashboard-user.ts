import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';
import { EventService } from '@app/services/event/event';
import { NavbarDashboard } from '@app/shared/components/navbar-dashboard/navbar-dashboard';

@Component({
  imports: [RouterOutlet, NavbarDashboard],
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.html',
})
export class DashboardUser {
  authService = inject(AuthService);
  eventService = inject(EventService)

  constructor() {
    this.eventService.connect()
  }

  currentUser = toSignal(this.authService.ensureCurrentUser(), { initialValue: null });
  isAuthenticated = this.authService.isAuthenticated;
}
