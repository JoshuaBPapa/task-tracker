import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const { url } = state;

  if (url === '/auth' && authService.loggedInUser) {
    router.navigateByUrl('/');
    return false;
  }

  if (url !== '/auth' && !authService.loggedInUser) {
    router.navigateByUrl('/auth');
    return false;
  }

  return true;
};
