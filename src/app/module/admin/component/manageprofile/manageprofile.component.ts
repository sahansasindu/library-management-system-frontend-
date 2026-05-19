import { Component } from '@angular/core';

@Component({
  selector: 'app-manageprofile',
  templateUrl: './manageprofile.component.html',
  styleUrl: './manageprofile.component.scss'
})
export class ManageprofileComponent {

  handleProfileSubmit(data: any) {
    console.log('Admin Form Submitted:', data.email, data.password);
    // Add logic to handle the form submission for admin
  }
}
