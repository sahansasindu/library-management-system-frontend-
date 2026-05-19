import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { UserAuthService } from "../../../service/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient, private authService: UserAuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  public isOpened=new BehaviorSubject<boolean>(false)
  public opened=false;

  public toggle(){
    this.opened=!this.opened
    this.isOpened.next(this.opened)
  }

  public getAllBooks(page: number, size: number, searchText: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    
    if (searchText) {
      params = params.set('searchText', searchText);
    }

    return this.http.get(`${this.baseUrl}/all`, { params });
  }

  public reserveBook(reservationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reserve`, reservationData, { headers: this.getAuthHeaders() });
  }

  public askAI(question: string): Observable<any> {
    const params = new HttpParams().set('question', question);
    return this.http.get(`http://localhost:8080/api/rag`, { params, headers: this.getAuthHeaders(), responseType: 'text' });
  }

  public getUserDashboard(memberId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/userdashboard/${memberId}`, {
      headers: this.getAuthHeaders()
    });
  }

  public getBorrowHistory(memberId: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/borrowhistory/${memberId}`, {
      headers: this.getAuthHeaders(),
      params
    });
  }

  public getReturnHistory(memberId: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(`${this.baseUrl}/returnhistory/${memberId}`, {
      headers: this.getAuthHeaders(),
      params
    });
  }
}
