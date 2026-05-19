import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserserviceService } from '../../service/userservice.service';
import { UserAuthService } from '../../../../service/user-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userFullName: string = 'User';
  memberId: string | null = null;
  today: Date = new Date();

  // Dashboard data
  reservedBooks: any[] = [];
  issuedBooks: any[] = [];
  returnedBooks: any[] = [];
  totalFines: number = 0;

  // Pagination State
  reservedPageIndex = 0;
  reservedPageSize = 4;

  issuedPageIndex = 0;
  issuedPageSize = 4;

  returnedPageIndex = 0;
  returnedPageSize = 4;

  get paginatedReservedBooks(): any[] {
    const start = this.reservedPageIndex * this.reservedPageSize;
    return this.reservedBooks.slice(start, start + this.reservedPageSize);
  }

  get paginatedIssuedBooks(): any[] {
    const start = this.issuedPageIndex * this.issuedPageSize;
    return this.issuedBooks.slice(start, start + this.issuedPageSize);
  }

  get paginatedReturnedBooks(): any[] {
    const start = this.returnedPageIndex * this.returnedPageSize;
    return this.returnedBooks.slice(start, start + this.returnedPageSize);
  }

  isLoading: boolean = true;
  hasError: boolean = false;


  activeTab: 'reserved' | 'issued' | 'returned' = 'reserved';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserserviceService,
    private authService: UserAuthService
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const navigation = window.history.state;
      if (navigation && navigation.user) {
        this.userFullName = navigation.user;
        localStorage.setItem('userFullName', this.userFullName);
      } else {
        this.userFullName = localStorage.getItem('userFullName') || 'User';
      }
      this.memberId = this.authService.getMemberId();
    }

    if (this.memberId) {
      this.loadUserDashboard();
    } else {
      this.isLoading = false;
      this.hasError = true;
    }
  }

  loadUserDashboard(): void {
    this.isLoading = true;
    this.hasError = false;
    this.userService.getUserDashboard(this.memberId!).subscribe({
      next: (res: any) => {
        const data = res.data;
        this.reservedBooks = data.reservedBooks || [];
        this.issuedBooks = data.issuedBooks || [];
        this.returnedBooks = data.returnedBooks || [];
        this.totalFines = data.totalFines || 0;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load user dashboard', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  setTab(tab: 'reserved' | 'issued' | 'returned'): void {
    this.activeTab = tab;
  }

  isDueSoon(dueDate: string): boolean {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const diff = (due.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  }

  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  }

  get activeIssuedCount(): number {
    return this.issuedBooks.filter(b => !b.isReturned).length;
  }

  onReservedPageChange(event: any): void {
    this.reservedPageIndex = event.pageIndex;
    this.reservedPageSize = event.pageSize;
  }

  onIssuedPageChange(event: any): void {
    this.issuedPageIndex = event.pageIndex;
    this.issuedPageSize = event.pageSize;
  }

  onReturnedPageChange(event: any): void {
    this.returnedPageIndex = event.pageIndex;
    this.returnedPageSize = event.pageSize;
  }
}
