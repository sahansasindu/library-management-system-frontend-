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

  public setToken(key:any,jwtToken:any){
    localStorage.setItem(key,jwtToken);
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

  public isExists(key:any):boolean{
    let token=localStorage.getItem(key);
    if(token){
      return true;
    }
    return false;
  }




}

