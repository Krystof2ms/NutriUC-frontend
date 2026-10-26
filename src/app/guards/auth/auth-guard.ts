import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.ensureCurrentUser().pipe(
    map((user) =>
      user
        ? true
        : router.createUrlTree(['/login']),
    ),
    catchError(() => of(router.createUrlTree(['/login']))),
  );
};