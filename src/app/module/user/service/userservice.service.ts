import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

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
    return this.http.post(`${this.baseUrl}/reserve`, reservationData);
  }

  public askAI(question: string): Observable<any> {
    const params = new HttpParams().set('question', question);
    return this.http.get(`http://localhost:8080/api/rag`, { params, responseType: 'text' });
  }
}
