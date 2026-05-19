import { Component } from '@angular/core';

@Component({
  selector: 'app-manageuserprofile',
  templateUrl: './manageuserprofile.component.html',
  styleUrl: './manageuserprofile.component.scss'
})
export class ManageuserprofileComponent {

  handleProfileSubmit(data: any) {
    console.log('User Form Submitted:', data.email, data.password);
    // Add logic to handle the form submission for user
  }
}
