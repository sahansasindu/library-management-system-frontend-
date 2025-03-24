import { Component } from '@angular/core';
import { AdminseviceService } from "./service/adminsevice.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  opened = false; // Set default to false

  constructor(private menuService: AdminseviceService) {
    this.menuService.isOpened.subscribe(data => {
      this.opened = data; // Sync with the service
    });
  }
}
