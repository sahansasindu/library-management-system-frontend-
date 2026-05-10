import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UserserviceService } from "../../service/userservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-bookresavation',
  templateUrl: './bookresavation.component.html',
  styleUrls: ['./bookresavation.component.scss']
})
export class BookresavationComponent implements OnInit {
  books: any[] = [];
  searchText: string = '';
  page: number = 0;
  size: number = 8;
  totalItems: number = 0;
  isLoading: boolean = false;

  constructor(
    private userService: UserserviceService,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.userService.getAllBooks(this.page, this.size, this.searchText).subscribe({
      next: (response) => {
        if (response.code === 200) {
          this.books = response.data.dataList || [];
          this.totalItems = response.data.dataCount || 0;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Error fetching books', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.page = 0;
    this.loadBooks();
  }

  onPageChange(event: any): void {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadBooks();
  }

  reserveBook(bookId: string): void {
    let memberId = 'MEM-001';
    
    if (isPlatformBrowser(this.platformId)) {
      memberId = localStorage.getItem('user_id') || 'MEM-001'; 
    }
    
    const reservationData = {
      member_id: memberId,
      book_id: bookId
    };

    this.userService.reserveBook(reservationData).subscribe({
      next: (response) => {
        this.snackBar.open('Book reserved successfully!', 'Close', { duration: 3000 });
        this.loadBooks(); // Refresh availability
      },
      error: (err) => {
        this.snackBar.open('Failed to reserve book', 'Close', { duration: 3000 });
      }
    });
  }
}
