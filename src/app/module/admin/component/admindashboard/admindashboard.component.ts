import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AdminseviceService } from '../../service/adminsevice.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.scss'
})
export class AdmindashboardComponent implements OnInit {
  userFullName: string = 'Admin';
  today: Date = new Date();


  totalBooks: number = 0;
  totalMembers: number = 0;
  issuedBooks: number = 0;
  overdueBooks: number = 0;
  totalReturnedBooks: number = 0;
  totalReservations: number = 0;
  recentTransactions: any[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;

  bookCategories: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private adminService: AdminseviceService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navigation = window.history.state;
      if (navigation && navigation.user) {
        this.userFullName = navigation.user;
        localStorage.setItem('userFullName', this.userFullName);
      } else {
        this.userFullName = localStorage.getItem('userFullName') || 'Admin';
      }
    }
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.isLoading = true;
    this.hasError = false;
    this.adminService.getAdminDashboardStats().subscribe({
      next: (res: any) => {
        const data = res.data;
        console.log('Dashboard stats response:', data);
        this.totalBooks = data.totalBooks;
        this.totalMembers = data.totalMembers;
        this.issuedBooks = data.issuedBooks;
        this.overdueBooks = data.overdueBooks;
        this.totalReturnedBooks = data.totalReturnedBooks;
        this.totalReservations = data.totalReservations;
        this.recentTransactions = data.recentTransactions || [];


        let categoryCounts = data?.categoryCounts;
        if (!categoryCounts || categoryCounts.length === 0) {

          categoryCounts = [
            { name: 'Fiction', count: 45 },
            { name: 'Science', count: 30 },
            { name: 'History', count: 25 },
            { name: 'Romance', count: 20 },
            { name: 'Mystery', count: 15 },
            { name: 'Biography', count: 10 }
          ];
        }

        categoryCounts.sort((a: any, b: any) => b.count - a.count);
        const maxCount = categoryCounts.length > 0 ? categoryCounts[0].count : 1;
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#ef4444', '#8b5cf6', '#06b6d4', '#3b82f6'];
        this.bookCategories = categoryCounts.map((cat: any, index: number) => ({
          name: cat.name,
          count: cat.count,
          color: colors[index % colors.length],
          width: maxCount > 0 ? `${Math.round((cat.count / maxCount) * 100)}%` : '0%'
        }));

        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load dashboard stats', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  getTransactionBadgeClass(type: string): string {
    switch (type) {
      case 'BORROW': return 'badge-borrow';
      case 'RETURN': return 'badge-return';
      case 'RECEIVE': return 'badge-reserve';
      case 'OVERDUE': return 'badge-overdue';
      default: return 'badge-default';
    }
  }

  getTransactionIcon(type: string): string {
    switch (type) {
      case 'BORROW': return '📤';
      case 'RETURN': return '📥';
      case 'RECEIVE': return '🔖';
      case 'OVERDUE': return '⚠️';
      default: return '📋';
    }
  }
}
