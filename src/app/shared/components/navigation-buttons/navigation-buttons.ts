import { CursorDirection } from '@api/index';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { LucideArrowBigLeftDash, LucideArrowBigRightDash } from '@lucide/angular';

@Component({
  imports: [LucideArrowBigRightDash, LucideArrowBigLeftDash],
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.html',
  styleUrl: "./navigation-buttons.css",
})
export class NavigationButtons {
  private readonly router = inject(Router);

  next_cursor = input<number | null>();
  previous_cursor = input<number | null>();

  next() {
    const cursor = this.next_cursor();
    if (!cursor) return;

    this.router.navigate([], {
      queryParams: {
        cursor,
        dir: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  previous() {
    const cursor = this.previous_cursor();
    if (!cursor) return;

    this.router.navigate([], {
      queryParams: {
        cursor,
        dir: "previous" satisfies CursorDirection,
      },
      queryParamsHandling: 'merge',
    });
  }
}
