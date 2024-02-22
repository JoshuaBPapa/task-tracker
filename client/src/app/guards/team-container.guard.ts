import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';

export const teamContainerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.loggedInUser && authService.loggedInUser.authLevel !== 4) {
    router.navigateByUrl('/');

    return false;
  }

  return true;
};
