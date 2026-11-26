import { Component, signal } from '@angular/core';
import { LucideMenu, LucideX } from '@lucide/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeSelector } from '../theme-selector/theme-selector';

@Component({
  selector: 'app-mobile-menu',
  imports: [LucideMenu, LucideX, RouterLink, RouterLinkActive, ThemeSelector],
  templateUrl: './mobile-menu.html',
})
export class MobileMenu {
  readonly open = signal(false);
  readonly links = [
    { label: 'Inicio', href: '/' },
    { label: 'Recetas', href: '/recetas' },
    { label: 'Tips', href: '/tips' },
    { label: 'Login', href: '/login' },
    { label: 'Registro', href: '/register' },
  ];

  toggle() {
    this.open.update((open) => !open);
  }

  close() {
    this.open.set(false);
  }
}
