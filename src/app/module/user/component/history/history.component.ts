import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserserviceService } from '../../service/userservice.service';
import { UserAuthService } from '../../../../service/user-auth.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {

  memberId: string | null = null;
  activeTab: 'borrow' | 'return' = 'borrow';

  borrowHistory: any[] = [];
  filteredBorrowHistory: any[] = [];
  
  returnHistory: any[] = [];
  filteredReturnHistory: any[] = [];

  isLoading: boolean = true;
  hasError: boolean = false;
  searchText: string = '';

  // Pagination State
  borrowPage = 0;
  borrowSize = 5;
  totalBorrowCount = 0;

  returnPage = 0;
  returnSize = 5;
  totalReturnCount = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private userService: UserserviceService,
    private authService: UserAuthService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.memberId = this.authService.getMemberId();
    }

    if (this.memberId) {
      this.loadHistoryData();
    } else {
      this.isLoading = false;
      this.hasError = true;
    }
  }

  loadHistoryData(): void {
    this.loadBorrowHistory();
    this.loadReturnHistory();
  }

  loadBorrowHistory(): void {
    this.isLoading = true;
    this.hasError = false;
    this.userService.getBorrowHistory(this.memberId!, this.borrowPage, this.borrowSize).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.borrowHistory = res.data.dataList || [];
          this.totalBorrowCount = res.data.dataCount || 0;
        } else {
          this.borrowHistory = [];
          this.totalBorrowCount = 0;
        }
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load borrow history', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  loadReturnHistory(): void {
    this.isLoading = true;
    this.hasError = false;
    this.userService.getReturnHistory(this.memberId!, this.returnPage, this.returnSize).subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.returnHistory = res.data.dataList || [];
          this.totalReturnCount = res.data.dataCount || 0;
        } else {
          this.returnHistory = [];
          this.totalReturnCount = 0;
        }
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load return history', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  setTab(tab: 'borrow' | 'return'): void {
    this.activeTab = tab;
    this.searchText = '';
    this.applyFilters();
  }

  applyFilters(): void {
    const search = this.searchText.toLowerCase().trim();
    if (this.activeTab === 'borrow') {
      if (!search) {
        this.filteredBorrowHistory = [...this.borrowHistory];
      } else {
        this.filteredBorrowHistory = this.borrowHistory.filter(item => 
          item.title?.toLowerCase().includes(search) ||
          item.author?.toLowerCase().includes(search) ||
          item.bookId?.toLowerCase().includes(search)
        );
      }
    } else {
      if (!search) {
        this.filteredReturnHistory = [...this.returnHistory];
      } else {
        this.filteredReturnHistory = this.returnHistory.filter(item => 
          item.title?.toLowerCase().includes(search) ||
          item.author?.toLowerCase().includes(search) ||
          item.bookId?.toLowerCase().includes(search)
        );
      }
    }
  }

  onBorrowPageChange(event: any): void {
    this.borrowPage = event.pageIndex;
    this.borrowSize = event.pageSize;
    this.loadBorrowHistory();
  }

  onReturnPageChange(event: any): void {
    this.returnPage = event.pageIndex;
    this.returnSize = event.pageSize;
    this.loadReturnHistory();
  }

  isOverdue(dueDate: string): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  }
}
