import { Component, inject, OnDestroy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';
import { EventService } from '@app/services/event/event';
import { NavbarDashboard } from '@app/shared/components/navbar-dashboard/navbar-dashboard';
import { Sonner } from '@app/shared/components/sonner/sonner';

@Component({
  imports: [RouterOutlet, NavbarDashboard, Sonner],
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.html',
})
export class DashboardUser implements OnDestroy {
  authService = inject(AuthService);
  eventService = inject(EventService);

  currentUser = toSignal(this.authService.ensureCurrentUser(), { initialValue: null });
  isAuthenticated = this.authService.isAuthenticated;

  constructor() {
    this.eventService.connect();
  }

  ngOnDestroy(): void {
    this.eventService.disconnect();
  }
}
