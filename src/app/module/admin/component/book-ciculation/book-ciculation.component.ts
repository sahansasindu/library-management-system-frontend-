import { Component } from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";

@Component({
  selector: 'app-book-ciculation',
  templateUrl: './book-ciculation.component.html',
  styleUrls: ['./book-ciculation.component.scss']
})
export class BookCiculationComponent {
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

  members = [
    { memberid: 'LB0001', email: 'user1@example.com', role: 'ADMIN' },
    { memberid: 'LB0002', email: 'user2@example.com', role: 'USER' },
    { memberid: 'LB0003', email: 'user3@example.com', role: 'USER' },
    { memberid: 'LB0004', email: 'admin1@example.com', role: 'ADMIN' }
  ];

  showReservedBook() {
    this.viewMode = 'reserved';
  }

  issueBook() {
    this.viewMode = 'issueform';
  }

  deleteMember(memberId: string) {
    this.members = this.members.filter(member => member.memberid !== memberId);
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
