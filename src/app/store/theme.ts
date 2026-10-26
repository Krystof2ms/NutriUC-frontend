import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Theme } from '@app/types/theme';

@Injectable({ providedIn: 'root' })
export class ThemeState {
  private readonly storageKey = 'theme-preference';
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _theme = signal<Theme>(this.load());

  readonly theme = this._theme.asReadonly();

  load(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return Theme.SYSTEM;
    }

    const stored = localStorage.getItem(this.storageKey);

    if (stored === Theme.LIGHT) {
      return Theme.LIGHT;
    }

    if (stored === Theme.DARK) {
      return Theme.DARK;
    }

    return Theme.SYSTEM;
  }

  private applyTheme(theme: Theme): void {
    const html = document.documentElement;

    html.classList.remove('light', 'dark');

    if (theme === Theme.SYSTEM) {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      html.classList.add(isDark ? 'dark' : 'light');
      return;
    }

    html.classList.add(theme);
  }

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        const theme = this._theme();

        localStorage.setItem(this.storageKey, theme);

        this.applyTheme(theme);
      });
    }
  }

  update(theme: Theme) {
    this._theme.set(theme);
  }
}
