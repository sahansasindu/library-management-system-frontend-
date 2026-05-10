import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent implements OnInit {

  userFullName: string | null = 'Admin'; // Default if name not found

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navigation = window.history.state;

      if (navigation && navigation.user) {
        this.userFullName = navigation.user;
        localStorage.setItem('userFullName', this.userFullName!);
      } else {
        this.userFullName = localStorage.getItem('userFullName') || 'Admin';
      }
      console.log('User:', this.userFullName);
    }
  }
}
