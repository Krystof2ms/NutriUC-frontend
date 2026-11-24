import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';

export const dashboardIndexGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const role = auth.currentUser()?.role;

  return role ? router.createUrlTree(['/dashboard', role]) : router.createUrlTree(['/unauthorized']);
};
