import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "../../../service/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private readonly BASE_URL = 'http://localhost:8080/api/books';
  private readonly Admin_URL = 'http://localhost:8080/api/v1/admin';

  private openedSubject = new BehaviorSubject<boolean>(false);
  public isOpened = this.openedSubject.asObservable();

  constructor(private httpClient: HttpClient, private authService: UserAuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  public getAllBooks(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.BASE_URL}/all`);
  }

  public toggle(): void {
    this.openedSubject.next(!this.openedSubject.value);
  }

}
