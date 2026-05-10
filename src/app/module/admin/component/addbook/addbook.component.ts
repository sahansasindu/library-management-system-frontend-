import { Component, OnInit } from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {
  isAddBookVisible = true;

  book = {
    bookid: '',
    title: '',
    author: '',
    isbn: '',
    category: '',
    qty: 0
  };

  bookList: any[] = [];
  selectedFile: File | null = null;

  // Pagination and Search state
  page: number = 0;
  size: number = 5;
  searchText: string = '';
  totalBooks: number = 0;


  constructor(private adminService: AdminseviceService) { }

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.adminService.getAllBooks(this.page, this.size, this.searchText).subscribe((response: any) => {
      console.log("Books API Response:", response);
      if (response && response.data) {
        const books = response.data.dataList || [];
        this.totalBooks = response.data.dataCount || 0;
        this.bookList = books.map((book: any) => ({
          ...book,
          photoBase64: book.photoBase64 || 'assets/default-book.png'
        }));
      } else {
        this.bookList = [];
        this.totalBooks = 0;
      }
    }, error => {
      console.error("Error fetching books:", error);
    });
  }

  onSearchChange() {
    this.page = 0;
    this.getBooks();
  }

  nextPage() {
    if ((this.page + 1) * this.size < this.totalBooks) {
      this.page++;
      this.getBooks();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getBooks();
    }
  }


  onSubmit(form: NgForm) {
    this.adminService.addBook(this.book, this.selectedFile).subscribe(response => {
      console.log("Book Added Successfully:", response);
      alert('Book added successfully!');
      this.bookList.push(response);
      form.reset();
    }, error => {
      console.error("Error Adding Book:", error);
      alert('Failed to add book. Please try again.');
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

  reserveBook(book: any) {

    book.reserved = true;
  }

  closeReservation(book: any) {

    book.reserved = false;
  }

}
