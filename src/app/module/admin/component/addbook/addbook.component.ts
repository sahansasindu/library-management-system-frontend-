import { Component, OnInit } from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
  isAddBookVisible = true; // Toggle between Add Book & Display Books

  book = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    qty: 0 // Ensure a number value
  };

  bookList: any[] = []; // List to hold fetched books
  selectedFile: File | null = null; // Store selected file

  constructor(private adminService: AdminseviceService) {}

  ngOnInit() {
    this.getBooks(); // Fetch books when component initializes
  }

  // Method to get books from the backend
  getBooks() {
    this.adminService.getAllBooks().subscribe((books: any[]) => {
      this.bookList = books.map(book => ({
        ...book,
        photoBase64: book.photoBase64 || 'assets/default-book.png' // Fallback for missing images
      }));
    }, error => {
      console.error("Error fetching books:", error);
    });
  }

  onSubmit(form: NgForm) {
    this.adminService.addBook(this.book, this.selectedFile).subscribe(response => {
      console.log("Book Added Successfully:", response);
      this.bookList.push(response); // Use response from backend
      form.reset();
    }, error => {
      console.error("Error Adding Book:", error);
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  showAddBook() {
    this.isAddBookVisible = true;
  }

  showBookList() {
    this.isAddBookVisible = false;
  }

  removeBook(book: any) {
    this.bookList = this.bookList.filter(b => b !== book);
  }
}
