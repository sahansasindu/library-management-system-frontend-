import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../../service/user-auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminseviceService {

  private ADMIN_BASE_URL = 'http://localhost:8080/api/books/add'; // Backend API URL
  private API_URL = 'http://localhost:8080/api/books/all'; // API to fetch books

  constructor(private httpClient: HttpClient, private authService: UserAuthService) {}

  // Method to add a book
  public addBook(bookData: any, file: File | null): Observable<any> {
    const token = this.authService.getToken(); // Get token from storage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Set token in headers
    });

    const formData = new FormData();
    formData.append('book', JSON.stringify(bookData)); // Attach book details
    if (file) {
      formData.append('file', file); // Attach file if available
    }

    return this.httpClient.post(this.ADMIN_BASE_URL, formData, { headers });
  }

  // Method to get all books
  public getAllBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.API_URL);
  }

  // Existing BehaviorSubject for toggle functionality
  private openedSubject = new BehaviorSubject<boolean>(false);
  public isOpened = this.openedSubject.asObservable();

  public toggle() {
    const newState = !this.openedSubject.value;
    this.openedSubject.next(newState);
  }
}
