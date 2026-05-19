import {Component, OnInit} from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";
import { DatePipe } from '@angular/common';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-ciculation',
  templateUrl: './book-ciculation.component.html',
  styleUrls: ['./book-ciculation.component.scss'],
  providers: [DatePipe]
})
export class BookCiculationComponent implements OnInit{
  viewMode: string = 'reserved'; // Default view

  constructor(
    private adminService: AdminseviceService,
    private snackBar: MatSnackBar
  ) {}

  issueBookData = {
    member_id: '',
    book_id: '',
    issue_date: '',
    return_date: ''
  };

  returnBookData = {
    memberid: '',
    bookid: '',
    recived_date: ''
  };

  reserveBookData = {
    member_id: '',
    book_id: ''
  };


  reservedBooks: any[] = [];
  issueBooks: any[] = [];
  returnBooks: any[] = [];

  // Pagination State
  reservedPage = 0;
  reservedSize = 5;
  totalReservedCount = 0;

  returnedPage = 0;
  returnedSize = 5;
  totalReturnedCount = 0;

  issuedPage = 0;
  issuedSize = 5;
  totalIssuedCount = 0;

  searchIssuedText = '';
  searchReturnedText = '';

  getLocalDateString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.fetchIssuedBooks();
    this.fetchReservedBooks();
    this.fetchReturnedBooks();
    this.returnBookData.recived_date = this.getLocalDateString();
  }


   fetchReservedBooks() {
     this.adminService.getReservedBooks(this.reservedPage, this.reservedSize).subscribe(
       (response: any) => {
         console.log("API Response:", response);
         if (response && response.data) {
           this.reservedBooks = response.data.dataList || [];
           this.totalReservedCount = response.data.dataCount || 0;
         } else {
           this.reservedBooks = [];
           this.totalReservedCount = 0;
         }
         console.log("Formatted Data:", this.reservedBooks);
       },
       (error) => {
         console.error("Error fetching reserved books:", error);
         this.reservedBooks = [];
         this.totalReservedCount = 0;
       }
     );
  }


  fetchIssuedBooks() {
    this.adminService.getIssuedBooks(this.issuedPage, this.issuedSize, this.searchIssuedText).subscribe(
      (response: any) => {
        console.log("Issued Books API Response:", response);
        if (response && response.data) {
          this.issueBooks = response.data.dataList || [];
          this.totalIssuedCount = response.data.dataCount || 0;
        } else {
          this.issueBooks = [];
          this.totalIssuedCount = 0;
        }
        console.log("Formatted Issued Books:", this.issueBooks);
      },
      (error) => {
        console.error("Error fetching issued books:", error);
        this.issueBooks = [];
        this.totalIssuedCount = 0;
      }
    );
  }


  fetchReturnedBooks() {
    this.adminService.getReturnedBooks(this.returnedPage, this.returnedSize, this.searchReturnedText).subscribe(
      (response: any) => {
        console.log("Returned Books:", response);
        if (response && response.data) {
          this.returnBooks = response.data.dataList || [];
          this.totalReturnedCount = response.data.dataCount || 0;
        } else {
          this.returnBooks = [];
          this.totalReturnedCount = 0;
        }
        console.log("Formatted Returned Books:", this.returnBooks);
      },
      (error) => {
        console.error("Error fetching returned books:", error);
        this.returnBooks = [];
        this.totalReturnedCount = 0;
      }
    );
  }

  onSearchIssued() {
    this.issuedPage = 0;
    this.fetchIssuedBooks();
  }

  onSearchReturned() {
    this.returnedPage = 0;
    this.fetchReturnedBooks();
  }

  onReservedPageChange(event: any): void {
    this.reservedPage = event.pageIndex;
    this.reservedSize = event.pageSize;
    this.fetchReservedBooks();
  }

  onReturnedPageChange(event: any): void {
    this.returnedPage = event.pageIndex;
    this.returnedSize = event.pageSize;
    this.fetchReturnedBooks();
  }

  onIssuedPageChange(event: any): void {
    this.issuedPage = event.pageIndex;
    this.issuedSize = event.pageSize;
    this.fetchIssuedBooks();
  }



  showReservedBook() {
    this.viewMode = 'reserved';
  }

  issueBook() {
    this.viewMode = 'issueform';
  }

  deleteMember(memberId: string) {

  }

  editMember(memberId: string) {
    // Implement edit logic here
  }

  showIssueBookDetails() {
    this.viewMode = 'issued';
  }

  returnBook() {
    this.viewMode = 'returnedform';
    this.returnBookData.recived_date = this.getLocalDateString();
  }

  showReturnBookDetails() {
    this.viewMode = 'returned';
  }

  onIssueSubmit(form: any) {
    if (form.valid) {
      this.adminService.borrowBook(this.issueBookData).subscribe(
        () => {
          this.snackBar.open('Book issued successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          form.reset();
        },
        () => {
          this.snackBar.open('Failed to issue book!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }

  onReturnSubmit(form: any) {
    if (form.valid) {
      console.log("Reserve Book Data: ", this.returnBookData);

      this.adminService.returnBook(this.returnBookData).subscribe(
        () => {
          this.snackBar.open('Book returned successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          form.resetForm({
            member_id: '',
            book_id: ''
          });
          this.returnBookData = {
            memberid: '',
            bookid: '',
            recived_date: this.getLocalDateString()
          };
        },
        () => {
          this.snackBar.open('Failed to return book!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }

  issueReservedBook(reserved: any) {
    const issueData = {
      member_id: reserved.member_id,
      book_id: reserved.book_id
    };
    this.adminService.borrowBook(issueData).subscribe(
      () => {
        this.snackBar.open('Book issued successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.fetchReservedBooks();
        this.fetchIssuedBooks();
      },
      (error) => {
        console.error("Error issuing book:", error);
        this.snackBar.open('Failed to issue book!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

}
