import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-staterheader',
  templateUrl: './staterheader.component.html',
  styleUrl: './staterheader.component.scss'
})
export class StaterheaderComponent {

  constructor(private router:Router) {
  }

  isLoggedIN() {
    return false;
  }

  public logOut(){

    this.router.navigate(['dashboard'])

  }

  toggleMenu() {

  }
}
