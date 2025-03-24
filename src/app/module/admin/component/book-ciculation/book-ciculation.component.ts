import { Component } from '@angular/core';

@Component({
  selector: 'app-book-ciculation',
  templateUrl: './book-ciculation.component.html',
  styleUrl: './book-ciculation.component.scss'
})
export class BookCiculationComponent {
  viewMode: string = 'reserved'; // Default view

  issueBook1 = {
    member_id: '',
    book_id: '',
    issue_date: '',
    return_date: ''
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

  onSubmit(form: any) {
    if (form.valid) {
      console.log("Issued Book:", this.issueBook);
      alert("Book issued successfully!");

      // Reset the form after submission

      form.resetForm();
    }
  }
}
