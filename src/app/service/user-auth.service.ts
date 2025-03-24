import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles',JSON.stringify(roles))
  }

  public getRoles():[]{
    return JSON.parse(<string>localStorage.getItem('roles'));
  }

  public setToken(jwtToken:string){
    localStorage.setItem("token",jwtToken);
  }

  public getToken(): String {
    return <String>localStorage.getItem('token'); // Correct key
  }



  public clear(){
    localStorage.clear();
  }


  public isLoggedIn(){

    return this.getRoles() && this.getToken();

  }




}

