import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AdminseviceService } from "../../module/admin/service/adminsevice.service";
import { UserserviceService } from "../../module/user/service/userservice.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIcon, RouterModule]
})
export class HeaderComponent implements OnInit {
  @Input() role: 'admin' | 'user' = 'user';
  userName: string = '';
  isDropdownOpen = false;

  constructor(
    private adminService: AdminseviceService,
    private userService: UserserviceService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.userName = localStorage.getItem('userFullName') || (this.role === 'admin' ? 'Admin User' : 'Library Member');
    } else {
      this.userName = this.role === 'admin' ? 'Admin User' : 'Library Member';
    }
  }

  toggleMenu() {
    if (this.role === 'admin') {
      this.adminService.toggle();
    } else {
      this.userService.toggle();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
