import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userFullName: string | null = 'User';
  borrowedBooks: any[] = [];
  pendingRequests: any[] = [];
  availableBooks: any[] = [];
  fineAmount: number = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navigation = window.history.state;

      // Retrieve user's name
      if (navigation && navigation.user) {
        this.userFullName = navigation.user;
        localStorage.setItem('userFullName', this.userFullName!);
      } else {
        this.userFullName = localStorage.getItem('userFullName') || 'User';
      }
    }

    // Sample data - This should be fetched from API
    this.borrowedBooks = [
      { title: 'The Great Gatsby', dueDate: '2025-04-01' },
      { title: '1984', dueDate: '2025-04-10' }
    ];

    this.pendingRequests = [
      { title: 'Harry Potter', status: 'Pending' }
    ];

    this.availableBooks = [
      { title: 'Pride and Prejudice', category: 'Fiction' },
      { title: 'Atomic Habits', category: 'Self-help' }
    ];

    this.fineAmount = 100; // Example fine amount
  }
}
