import { Component } from '@angular/core';
import {UserserviceService} from "./service/userservice.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  opened =true;

  constructor(private menuService:UserserviceService) {
    this.menuService.isOpened.subscribe(data=>{
      this.opened=data;
    })
  }

}
