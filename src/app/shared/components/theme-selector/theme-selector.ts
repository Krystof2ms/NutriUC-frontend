import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { LucideDynamicIcon } from '@lucide/angular';
import { isPlatformBrowser } from '@angular/common';
import { ThemeState } from '@app/store/theme';
import { themeMap } from '@app/constants/theme';
import { Theme } from '@app/types/theme';

type ThemeSelectorVariant = 'dropdown' | 'sidebar';

@Component({
  imports: [LucideDynamicIcon],
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.html',
})
export class ThemeSelector {
  private readonly platformId = inject(PLATFORM_ID);

  readonly variant = input<ThemeSelectorVariant>('dropdown');

  readonly animate_enter =
    this.variant() == 'dropdown' ? 'animate-slide-in-250' : 'animate-fade-in-250';
  readonly animate_leave =
    this.variant() == 'dropdown' ? 'animate-slide-out-250' : 'animate-fade-out-250';

  readonly themeState = inject(ThemeState);
  protected readonly themeMap = themeMap;
  protected readonly themes = Object.entries(themeMap) as [Theme, (typeof themeMap)[Theme]][];
  readonly theme = this.themeState.theme;

  readonly open = signal<boolean>(false);

  private containerRef = viewChild<ElementRef<HTMLDivElement>>('container');

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;

    effect((onCleanup) => {
      const container = this.containerRef()?.nativeElement;
      if (!container) return;

      const handle = (event: MouseEvent) => {
        if (!container.contains(event.target as Node)) {
          this.open.set(false);
        }
      };

      document.addEventListener('mousedown', handle);

      onCleanup(() => {
        document.removeEventListener('mousedown', handle);
      });
    });
  }

  toggleOpen() {
    this.open.set(!this.open());
  }

  setTheme(theme: Theme) {
    this.themeState.update(theme);
    this.open.set(false);
  }
}
