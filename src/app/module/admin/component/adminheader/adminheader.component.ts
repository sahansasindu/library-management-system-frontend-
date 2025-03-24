import { Component } from '@angular/core';
import { AdminseviceService } from "../../service/adminsevice.service";

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss']
})
export class AdminheaderComponent {
  constructor(private menuService: AdminseviceService) {}

  toggleMenu() {
    this.menuService.toggle();
  }
}
