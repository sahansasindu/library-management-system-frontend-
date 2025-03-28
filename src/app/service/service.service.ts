import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() {}

  public isOpened=new BehaviorSubject<boolean>(false)
  public opened=false;

  public toggle(){
    this.opened=!this.opened
    this.isOpened.next(this.opened)
  }
}
