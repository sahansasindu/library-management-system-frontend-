import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserAuthService} from "../../../service/user-auth.service";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AdminseviceService {

  private readonly BASE_URL = 'http://localhost:8080/api/books';
  private readonly Admin_URL = 'http://localhost:8080/api/v1/admin';

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

  public getAllBooks(page: number, size: number, searchText: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('searchText', searchText);

    return this.httpClient.get<any>(`${this.BASE_URL}/all`, {
      params: params
    });
  }

  public getAllBooksForAdmin(page: number, size: number, searchText: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('searchText', searchText);

    return this.httpClient.get<any>(`${this.BASE_URL}/all-for-admin`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }



  // API call to add a member
  public addUserDetails(memberData: any): Observable<any> {
    return this.httpClient.post(`${this.Admin_URL}/adduser`, memberData, {
      headers: this.getAuthHeaders()
    });
  }


  public toggle(): void {
    this.openedSubject.next(!this.openedSubject.value);
  }


  public borrowBook(issueData: any): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/borrowbookrecoard`, issueData, {
      headers: this.getAuthHeaders()
    });
  }


  public returnBook(returnData: any): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/returnbook`, returnData, {
      headers: this.getAuthHeaders()
    });
  }


  public getReservedBooks(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.httpClient.get<any>(`${this.BASE_URL}/reservationdetails`, {
      headers: this.getAuthHeaders(),
      params
    });
  }


  public getIssuedBooks(page: number, size: number, searchText: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (searchText) {
      params = params.set('searchText', searchText);
    }
    return this.httpClient.get<any>(`${this.BASE_URL}/issueBookdetails`, {
      headers: this.getAuthHeaders(),
      params
    });
  }


  public getReturnedBooks(page: number, size: number, searchText: string = ''): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (searchText) {
      params = params.set('searchText', searchText);
    }
    return this.httpClient.get<any>(`${this.BASE_URL}/returnbookdetails`, {
      headers: this.getAuthHeaders(),
      params
    });
  }


  public getMemberDetails(page: number, size: number, searchText: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('searchText', searchText);

    return this.httpClient.get<any>(`${this.Admin_URL}/getallmembers`, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }






  public getUserAccountDetails(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.Admin_URL}/getuseraccount`, {
      headers: this.getAuthHeaders(),
    });
  }


  // Method to update user state
  public updateUserState(memberId: string, activeState: boolean): Observable<any> {
    const body = { active_state: activeState };
    return this.httpClient.put(`${this.Admin_URL}/${memberId}`, body, {
      headers: this.getAuthHeaders()
    });
  }




  public getReservedBooksByMemberId(memberId: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/reservationdetails/${memberId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  public getAdminDashboardStats(): Observable<any> {
    return this.httpClient.get<any>(`${this.Admin_URL}/dashboard`, {
      headers: this.getAuthHeaders(),
    });
  }

  public changeBookActiveState(bookId: string, activeState: boolean): Observable<any> {
    const params = new HttpParams().set('activeState', activeState.toString());
    return this.httpClient.put(`${this.BASE_URL}/changeActiveState/${bookId}`, null, {
      headers: this.getAuthHeaders(),
      params: params
    });
  }

  public getAllFines(): Observable<any> {
    return this.httpClient.get<any>(`${this.Admin_URL}/fines`, {
      headers: this.getAuthHeaders(),
    });
  }

  public markFineAsPaid(returnBookId: number): Observable<any> {
    return this.httpClient.put<any>(`${this.Admin_URL}/fines/${returnBookId}/pay`, null, {
      headers: this.getAuthHeaders(),
    });
  }

  public getAllBookCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/categories`, {
      headers: this.getAuthHeaders()
    });
  }
}
