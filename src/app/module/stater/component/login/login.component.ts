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

        this.userAuthService.setRoles(response.role);  // Store roles correctly
        this.userAuthService.setToken(response.token);// Fix: Call setToken, not getToken
        const  role=response.role;
        if(role==='ADMIN'){

          this.router.navigate(['/admin'])

        }else{
          this.router.navigate(['/user'])
        }
        alert("Login Successful!");
      },
      (error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      }
    );


  }


}
