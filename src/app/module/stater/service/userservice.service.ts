import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  BASE_URl = "http://localhost:8080/api/v1/auth";


  constructor(private httpClient: HttpClient) {
  }


  public login(loginData: any) {
    return this.httpClient.post(this.BASE_URl + "/authenticate", loginData);

  }

  public register(RegisterData:any){
    return this.httpClient.post(this.BASE_URl + "/register",RegisterData)
  }


}
