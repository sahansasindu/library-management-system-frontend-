import {Component, OnInit} from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-ciculation',
  templateUrl: './book-ciculation.component.html',
  styleUrls: ['./book-ciculation.component.scss'],
  providers: [DatePipe]
})
export class BookCiculationComponent implements OnInit{
  viewMode: string = 'reserved'; // Default view

  constructor(private adminService: AdminseviceService) {}

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


  ngOnInit() {
    this.fetchIssuedBooks();
    this.fetchReservedBooks();
    this.fetchReturnedBooks();
  }


   fetchReservedBooks() {
     this.adminService.getReservedBooks().subscribe(
       (response: any) => {
         console.log("API Response:", response);


         if (response && response.data && Array.isArray(response.data)) {
           this.reservedBooks = response.data;
         } else {
           this.reservedBooks = [];
         }

         console.log("Formatted Data:", this.reservedBooks);
       },
       (error) => {
         console.error("Error fetching reserved books:", error);
         this.reservedBooks = [];
       }
     );


  }





  fetchIssuedBooks() {
    this.adminService.getIssuedBooks().subscribe(
      (response: any) => {
        console.log("Issued Books API Response:", response);

        if (response && response.data && Array.isArray(response.data)) {
          this.issueBooks = response.data;
        } else {
          this.issueBooks = [];
        }

        console.log("Formatted Issued Books:", this.issueBooks);
      },
      (error) => {
        console.error("Error fetching issued books:", error);
        this.issueBooks = [];
      }
    );
  }


  fetchReturnedBooks() {
    this.adminService.getReturnedBooks().subscribe(
      (response: any) => {
        console.log("Returned Books:", response);

        if (response && response.data && Array.isArray(response.data)) {
          this.returnBooks = response.data;
        } else {
          this.issueBooks = [];
        }
        console.log("Formatted Returned Books:", this.returnBooks);
      },
      (error) => {
        console.error("Error fetching issued books:", error);
        this.issueBooks = [];
      }
    );
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
  }

  showReturnBookDetails() {
    this.viewMode = 'returned';
  }

  onIssueSubmit(form: any) {
    if (form.valid) {
      this.adminService.borrowBook(this.issueBookData).subscribe(
        () => { alert('Book issued successfully!'); form.reset(); },
        () => { alert('Failed to issue book!'); }
      );
    }
  }

  onReturnSubmit(form: any) {
    if (form.valid) {
      console.log("Reserve Book Data: ", this.returnBookData);

      this.adminService.returnBook(this.returnBookData).subscribe(
        () => { alert('Book returned successfully!'); form.reset(); },
        () => { alert('Failed to return book!'); }
      );
    }
  }


}
