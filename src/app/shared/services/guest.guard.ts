import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../iam/services/authentication.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isSignedIn ) {
    router.navigate(['/meetings']); // Redirige si el usuario ya está autenticado
    return false;

  }
    return true; // Permite el acceso si no está autenticado

};
