import { Component, inject, input, signal } from '@angular/core';
import {
  LucideHouse,
  LucideMenu,
  LucideNotebookPen,
  LucideStickyNote,
  LucideUser,
  LucideUtensilsCrossed,
  LucideX,
  LucideLogOut,
} from '@lucide/angular';
import { UserIcon } from '../user-icon/user-icon';
import { UserSummaryMe } from '@app/types/api';
import { DashboardLink, Link } from '../dashboard-link';
import { AuthService } from '@app/services/auth/auth';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [LucideX, LucideMenu, UserIcon, LucideLogOut, DashboardLink, ThemeSelector],
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar-dashboard.html',
})
export class NavbarDashboard {
  private router = inject(Router);
  private authService = inject(AuthService);
  open = signal(false);

  user = input.required<UserSummaryMe>();

  basePathname = '/dashboard/user';
  links: Link[] = [
    {
      name: 'Inicio',
      href: `${this.basePathname}`,
      icon: LucideHouse,
      isRoot: true,
    },
    {
      name: 'Mi perfil',
      href: `${this.basePathname}/perfil`,
      icon: LucideUser,
    },
    {
      name: 'Mis creaciones',
      href: `${this.basePathname}/creaciones`,
      icon: LucideNotebookPen,
      isRoot: true,
      subLinks: [
        {
          name: 'Mis Recetas',
          href: `${this.basePathname}/mis-recetas`,
          icon: LucideUtensilsCrossed,
        },
        {
          name: 'Mis Tips',
          href: `${this.basePathname}/mis-tips`,
          icon: LucideStickyNote,
        },
      ],
    },
  ];

  toggleOpen() {
    this.open.set(!this.open());
  }

  async closeSession() {
    await firstValueFrom(this.authService.logout());
    this.router.navigate(['/login']);
  }
}
