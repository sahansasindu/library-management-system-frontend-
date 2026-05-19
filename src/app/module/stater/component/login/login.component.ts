import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { NgForm } from "@angular/forms";
import { UserserviceService } from "../../service/userservice.service";
import { UserAuthService } from "../../../../service/user-auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userService: UserserviceService,
    private userAuthService: UserAuthService,
    private router: Router,
    private snackBar: MatSnackBar) {
  }



  login(loginForm: NgForm) {
    console.log(loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response.role);

        const firstName = response.id.first_name;
        const lastName = response.id.last_name;
        const fullName = `${firstName} ${lastName}`;

        this.userAuthService.setRoles(response.role);
        this.userAuthService.setToken('access_token', response.token);
        this.userAuthService.setMemberId(response.id.member_id); // save member_id from auth response
        const role = response.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/admin'], { state: { user: fullName } });
        } else {
          this.router.navigate(['/user'], { state: { user: fullName } });
        }
        this.snackBar.open(`Login Successful! Welcome, ${fullName}`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

      },
      (error) => {
        console.error("Login failed:", error);
        this.snackBar.open("Login failed. Please check your credentials.", 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );


  }


}
