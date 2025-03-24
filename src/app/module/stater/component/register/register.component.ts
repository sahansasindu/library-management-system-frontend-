import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserserviceService} from "../../service/userservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(private registerUser: UserserviceService,
              private router:Router) {}

  Register(RegisterForm: NgForm) {
    if (RegisterForm.valid) {
      const userData = {
        ...RegisterForm.value, // Get all form values
        role: 'USER' // Set default role
      };

      console.log(userData);

      this.registerUser.register(userData).subscribe(
        response => {
          console.log("Registration successful!", response);
          this.router.navigate(['/stater/login']);
        },
        error => {
          console.error("Registration failed!", error);
        }
      );
    }
  }

}
