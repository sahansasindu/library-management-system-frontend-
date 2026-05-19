import { Component, OnInit } from '@angular/core';
import { AdminseviceService } from '../../service/adminsevice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-fines',
  templateUrl: './manage-fines.component.html',
  styleUrl: './manage-fines.component.scss'
})
export class ManageFinesComponent implements OnInit {

  fines: any[] = [];
  filteredFines: any[] = [];
  isLoading: boolean = true;
  hasError: boolean = false;
  searchText: string = '';
  activeFilter: 'all' | 'unpaid' | 'paid' = 'unpaid';

  constructor(
    private adminService: AdminseviceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFines();
  }

  loadFines(): void {
    this.isLoading = true;
    this.hasError = false;
    this.adminService.getAllFines().subscribe({
      next: (res: any) => {
        this.fines = res.data || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to load fines:', err);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  setFilter(filter: 'all' | 'unpaid' | 'paid'): void {
    this.activeFilter = filter;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.fines];

    // Status filter
    if (this.activeFilter === 'paid') {
      filtered = filtered.filter(f => f.paid === true);
    } else if (this.activeFilter === 'unpaid') {
      filtered = filtered.filter(f => f.paid === false);
    }

    // Search filter
    const search = this.searchText.toLowerCase().trim();
    if (search) {
      filtered = filtered.filter(f => 
        f.memberName?.toLowerCase().includes(search) ||
        f.memberId?.toLowerCase().includes(search) ||
        f.bookTitle?.toLowerCase().includes(search) ||
        f.bookId?.toLowerCase().includes(search)
      );
    }

    this.filteredFines = filtered;
  }

  markAsPaid(fine: any): void {
    if (confirm(`Are you sure you want to mark the fine of Rs. ${fine.amount} for ${fine.memberName} as paid?`)) {
      this.adminService.markFineAsPaid(fine.returnBookId).subscribe({
        next: (res: any) => {
          this.snackBar.open('Fine marked as paid successfully!', 'Close', { duration: 3000 });
          fine.paid = true;
          this.applyFilters();
        },
        error: (err: any) => {
          console.error('Error marking fine as paid', err);
          this.snackBar.open('Failed to mark fine as paid.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
