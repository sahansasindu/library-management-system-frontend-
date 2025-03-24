import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../../service/user-auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminseviceService {

  private readonly BASE_URL = 'http://localhost:8080/api/books';

  private openedSubject = new BehaviorSubject<boolean>(false);
  public isOpened = this.openedSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: UserAuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  public addBook(bookData: any, file: File | null = null): Observable<any> {
    const formData = new FormData();
    formData.append('book', JSON.stringify(bookData));
    if (file !== null) formData.append('file', file);
    return this.httpClient.post(`${this.BASE_URL}/add`, formData, { headers: this.getAuthHeaders() });
  }

  public getAllBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/all`);
  }

  public toggle(): void {
    this.openedSubject.next(!this.openedSubject.value);
  }

}
