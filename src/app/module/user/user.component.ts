import { Component } from '@angular/core';
import {UserserviceService} from "./service/userservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  opened =true;

  constructor(private menuService:UserserviceService,private router:Router) {
    this.menuService.isOpened.subscribe(data=>{
      this.opened=data;
    })
  }

  logout() {
    this.router.navigate(['/stater/login']);
    localStorage.clear();

  }

}
