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

  onSubmit(updateprofileForm: NgForm) {
    if (updateprofileForm.valid) {
      console.log('Form Submitted:', this.email, this.password);
      // Add logic to handle the form submission
    }
  }
}
