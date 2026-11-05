import { Component, input, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tip-card',
  imports: [DatePipe],
  templateUrl: './tip-card.html',
})
export class TipCard {
  id = input.required<number>();
  category = input.required<string>();
  title = input.required<string>();
  content = input.required<string>();
  ownerName = input.required<string>();
  createdAt = input.required<string>();

  expanded = signal(false);
}