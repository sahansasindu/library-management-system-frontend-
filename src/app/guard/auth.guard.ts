import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { UserAuthService } from "../service/user-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserAuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const snackBar = inject(MatSnackBar);

  if (authService.isExists('access_token')) {
    return true; // Allow access
  } else {
    if (isPlatformBrowser(platformId)) {
      snackBar.open("You need to log in first!", 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    router.navigate(['/login']); // Redirect to login page
    return false;
  }
};
