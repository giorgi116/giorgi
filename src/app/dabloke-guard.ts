import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const dablokeGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const router = inject(Router);

  if (cookie.get('user')) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
