import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';
import { UserCard } from '@app/shared/components/user-card/user-card';
import { toDefaultSignal } from '@app/shared/utils/to-default-signal';
import { UserSummaryMe } from '@app/types/api';
import { LucideUser } from '@lucide/angular';
import { map } from 'rxjs';

@Component({
  imports: [RouterLink, UserCard, LucideUser],
  selector: 'app-profile',
  styleUrl: './profile.css',
  templateUrl: './profile.html',
})
export class Profile {
  private authService = inject(AuthService);

  readonly user = toDefaultSignal(this.authService.ensureCurrentUser(), EMPTY_USER);
}

const EMPTY_USER = {
  public_id: '',
  name: '',
  email: '',
  created_at: '',
  has_image: false,
} satisfies UserSummaryMe;
