import { Component } from '@angular/core';
import {UserserviceService} from "../../service/userservice.service";

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.scss'
})
export class UserheaderComponent {
  constructor(private menuService:UserserviceService) {
  }

  toggleMenu() {

    this.menuService.toggle();

  }
}
