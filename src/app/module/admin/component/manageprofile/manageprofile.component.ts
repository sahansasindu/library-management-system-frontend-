import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-manageprofile',
  templateUrl: './manageprofile.component.html',
  styleUrl: './manageprofile.component.scss'
})
export class ManageprofileComponent {

  email: string = '';
  password: string = '';
  reenterPassword: string = '';
  passwordMismatch: boolean = false;

  onSubmit(updateprofileForm: NgForm) {
    if (updateprofileForm.valid && !this.passwordMismatch) {
      console.log('Form Submitted:', this.email, this.password);
      // Add logic to handle the form submission
    }
  }

  ngOnChanges() {
    this.passwordMismatch = this.password !== this.reenterPassword;
  }
}
