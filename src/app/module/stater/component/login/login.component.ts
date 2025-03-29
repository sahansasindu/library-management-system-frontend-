import { Component } from '@angular/core';
import {Router} from "@angular/router";

import {NgForm} from "@angular/forms";
import {UserserviceService} from "../../service/userservice.service";
import {UserAuthService} from "../../../../service/user-auth.service";





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userService:UserserviceService,
              private userAuthService:UserAuthService,
              private router:Router) {
  }



  login(loginForm: NgForm) {
    console.log(loginForm.value);
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response.role);

        // Extract first and last name
        const firstName = response.id.first_name;
        const lastName = response.id.last_name;
        const fullName = `${firstName} ${lastName}`;



        this.userAuthService.setRoles(response.role);
        this.userAuthService.setToken(response.token);
        const  role=response.role;

        if (role === 'ADMIN') {
          this.router.navigate(['/admin'], { state: { user: fullName } });
        } else {
          this.router.navigate(['/user'], { state: { user: fullName } });
        }
        alert(`Login Successful! Welcome, ${fullName}`);

      },
      (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
    );


  }


}
