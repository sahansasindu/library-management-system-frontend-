import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  public getAllBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/all`);
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


  public getReservedBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/reservationdetails`, {
      headers: this.getAuthHeaders(),
    });
  }


  public getIssuedBooks(): Observable<any> {
    return this.httpClient.get<any>(`${this.BASE_URL}/issueBookdetails`, {
      headers: this.getAuthHeaders(),
    });
  }


  public getReturnedBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/returnbookdetails`, {
      headers: this.getAuthHeaders(),
    });
  }

  public getMemberDetails():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.Admin_URL}/getallmembers`, {
      headers:this.getAuthHeaders(),
    });
  }


  public addFeeInformation(conditionData: any): Observable<any> {
    return this.httpClient.post(`${this.Admin_URL}/addinformation`, conditionData, {
      headers: this.getAuthHeaders()
    });
  }


  public getFeeInformation(): Observable<any> {
    return this.httpClient.get(`${this.Admin_URL}/getinformation`, {
      headers: this.getAuthHeaders()
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




}
