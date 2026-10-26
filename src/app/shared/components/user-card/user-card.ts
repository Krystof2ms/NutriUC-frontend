import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { UserIcon } from '@app/shared/components/user-icon/user-icon';
import { LucideCalendar, LucideMail } from '@lucide/angular';

@Component({
  imports: [UserIcon, LucideMail, LucideCalendar, DatePipe],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  readonly id = input.required<string>();
  readonly name = input.required<string>();
  readonly email = input.required<string>();
  readonly createAt = input.required<string>();
  readonly hasAvatar = input(false);
}
