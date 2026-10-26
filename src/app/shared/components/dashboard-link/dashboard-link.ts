import { Component, computed, effect, inject, input, signal } from '@angular/core';
import {
  LucideIcon,
  LucidePanelTopClose,
  LucidePanelTopOpen,
  LucideDynamicIcon,
} from '@lucide/angular';
import type { Link as Props } from './types';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  imports: [LucidePanelTopOpen, LucidePanelTopClose, LucideDynamicIcon, RouterLink],
  selector: 'app-dashboard-link',
  templateUrl: './dashboard-link.html',
})
export class DashboardLink {
  name = input.required<string>();
  href = input.required<string>();
  isRoot = input(false);
  icon = input.required<LucideIcon>();
  subLinks = input<Props[]>();

  private router = inject(Router);

  pathname = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url.split(/[?#]/)[0]),
      startWith(this.router.url.split(/[?#]/)[0]),
    ),
    { initialValue: this.router.url.split(/[?#]/)[0] },
  );

  hasChildren = computed(() => (this.subLinks()?.length ?? 0) > 0);

  active = computed(() => {
    const path = this.pathname();
    const href = this.href();

    return this.isRoot() ? path === href : path === href || path.startsWith(`${href}/`);
  });

  childActive = computed(() => {
    const path = this.pathname();

    return (
      this.subLinks()?.some((link) => path === link.href || path.startsWith(`${link.href}/`)) ??
      false
    );
  });

  open = signal(false);

  constructor() {
    effect(() => {
      if (this.childActive()) {
        this.open.set(true);
      }
    });
  }

  toggleOpen() {
    this.open.set(!this.open());
  }
}
