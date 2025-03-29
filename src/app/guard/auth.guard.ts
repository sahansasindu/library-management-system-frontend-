import {CanActivateFn, Router} from '@angular/router';
import {inject, Inject} from "@angular/core";
import {UserAuthService} from "../service/user-auth.service";


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(UserAuthService);
  const router = inject(Router);

  if (authService.isExists('access_token')) {
    return true; // Allow access
  } else {
    alert("You need to log in first!");
    router.navigate(['/login']); // Redirect to login page
    return false;
  }

};
