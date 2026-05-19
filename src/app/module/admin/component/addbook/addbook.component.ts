import { Component, OnInit } from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";
import { NgForm } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

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


  page: number = 0;
  size: number = 5;
  searchText: string = '';
  totalBooks: number = 0;


  categories: string[] = [];
  isAddingNewCategory = false;
  newCategoryName = '';

  constructor(
    private adminService: AdminseviceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getBooks();
    this.loadCategories();
  }

  loadCategories() {
    this.adminService.getAllBookCategories().subscribe((response: any) => {
      console.log("Categories response:", response);
      if (response && response.data) {
        this.categories = response.data;
      }
      if (this.categories.length === 0) {
        this.categories = ['Action', 'Romantic', 'Fiction', 'Science', 'History', 'Mystery', 'Biography'];
      }
    }, error => {
      console.error("Error fetching categories:", error);
      this.categories = ['Action', 'Romantic', 'Fiction', 'Science', 'History', 'Mystery', 'Biography'];
    });
  }

  toggleNewCategoryInput() {
    this.isAddingNewCategory = !this.isAddingNewCategory;
    if (!this.isAddingNewCategory) {
      this.newCategoryName = '';
    }
  }

  addNewCategory() {
    const trimmed = this.newCategoryName.trim();
    if (trimmed) {
      const formatted = trimmed.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      if (!this.categories.includes(formatted)) {
        this.categories.push(formatted);
      }
      this.book.category = formatted;
      this.isAddingNewCategory = false;
      this.newCategoryName = '';
    }
  }

  getBooks() {
    this.adminService.getAllBooksForAdmin(this.page, this.size, this.searchText).subscribe((response: any) => {
      console.log("Books API Response:", response);
      if (response && response.data) {
        const books = response.data.dataList || [];
        this.totalBooks = response.data.dataCount || 0;
        this.bookList = books.map((book: any) => ({
          ...book,
          photoBase64: book.photoBase64 || 'assets/default-book.png',
          activeState: book.activeState !== undefined ? book.activeState : true
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
      this.snackBar.open('Book added successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      if (response && response.data) {
        const newBook = response.data;
        this.bookList.push({
          ...newBook,
          photoBase64: newBook.photoBase64 || 'assets/default-book.png',
          activeState: newBook.activeState !== undefined ? newBook.activeState : true
        });
      }
      this.getBooks();
      this.loadCategories();
      this.isAddingNewCategory = false;
      this.newCategoryName = '';
      form.reset();
    }, error => {
      console.error("Error Adding Book:", error);
      this.snackBar.open('Failed to add book. Please try again.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
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
    this.adminService.changeBookActiveState(book.bookid, false).subscribe(
      response => {
        console.log("Book frozen successfully:", response);
        book.activeState = false;
        this.snackBar.open('Book state updated to Freeze successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error => {
        console.error("Error freezing book:", error);
        this.snackBar.open('Failed to freeze book. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  closeReservation(book: any) {
    this.adminService.changeBookActiveState(book.bookid, true).subscribe(
      response => {
        console.log("Book unfrozen successfully:", response);
        book.activeState = true;
        this.snackBar.open('Book state updated to Unfreeze successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error => {
        console.error("Error unfreezing book:", error);
        this.snackBar.open('Failed to unfreeze book. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

}
