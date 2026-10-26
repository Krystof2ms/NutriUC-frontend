import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowRight, LucideDynamicIcon, LucideIcon } from '@lucide/angular';

@Component({
  imports: [LucideDynamicIcon, LucideArrowRight, RouterLink],
  selector: 'app-card-link',
  templateUrl: './card-link.html',
})
export class CardLink {
  title = input.required<string>();
  content = input.required<string>();
  icon = input.required<LucideIcon>();
  href = input.required<string>();
}
