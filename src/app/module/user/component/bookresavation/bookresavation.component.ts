import { Component, OnInit } from '@angular/core';
import { UserserviceService } from "../../service/userservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserAuthService } from "../../../../service/user-auth.service";

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
    private userAuthService: UserAuthService
  ) { }

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
    const memberId = this.userAuthService.getMemberId();

    if (!memberId) {
      this.snackBar.open('Session expired. Please log in again.', 'Close', { duration: 3000 });
      return;
    }

    const reservationData = {
      member_id: memberId,
      book_id: bookId
    };

    this.userService.reserveBook(reservationData).subscribe({
      next: (response) => {
        this.snackBar.open('Book reserved successfully!', 'Close', { duration: 3000 });
        this.loadBooks();
      },
      error: (err) => {
        this.snackBar.open('Failed to reserve book', 'Close', { duration: 3000 });
      }
    });
  }
}
