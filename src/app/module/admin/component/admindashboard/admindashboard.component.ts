import { Component } from '@angular/core';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent {

  userFullName: any | null = 'Admin'; // Default if name not found

  constructor() {
    const navigation = window.history.state;


    if (navigation.user) {
      this.userFullName = navigation.user;

      localStorage.setItem('userFullName', this.userFullName);
    } else {

      this.userFullName = localStorage.getItem('userFullName') || 'Admin';
    }

    console.log('User:', this.userFullName);
  }

}
