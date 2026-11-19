import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideArrowLeft, LucideArrowUpRight, LucideLeaf } from '@lucide/angular';

@Component({
  selector: 'app-not-found',
  imports: [
    RouterLink,
    LucideArrowLeft,
    LucideArrowUpRight,
    LucideLeaf,
  ],
  templateUrl: './not-found.html',
})
export class NotFound {
  private router = inject(Router);

  get requestedPath(): string {
    return this.router.url;
  }
}
