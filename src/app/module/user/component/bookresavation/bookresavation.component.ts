import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../../service/userservice.service";


@Component({
  selector: 'app-bookresavation',
  templateUrl: './bookresavation.component.html',
  styleUrl: './bookresavation.component.scss'
})
export class BookresavationComponent implements OnInit{
  isAddBookVisible: any;

  bookList: any[] = []; //

  ngOnInit() {

    this.getBooks();

  }

  constructor(private userService: UserserviceService) {}

  getBooks() {
    this.userService.getAllBooks().subscribe((books: any[]) => {
      this.bookList = books.map(book => ({
        ...book,
        photoBase64: book.photoBase64 || 'assets/default-book.png' // Fallback for missing images
      }));
    }, error => {
      console.error("Error fetching books:", error);
    });
  }

  searchTerm: string = '';

  filteredBooks() {
    if (!this.searchTerm) {
      return this.bookList;
    }
    return this.bookList.filter(book =>
      book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  reserveBook(book: any) {
    // Mark the book as reserved
    book.reserved = true;

  }

  closeReservation(book: any) {
    // Mark the book reservation as closed
    book.reserved = false;

    // Update the book list locally (assuming backend stores the reservation status)
  }

  showBookList() {

  }

  showAddBook() {

  }
}
