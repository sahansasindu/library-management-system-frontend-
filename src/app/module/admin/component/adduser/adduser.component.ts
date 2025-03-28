import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserserviceService} from "../../../stater/service/userservice.service";
import {Router} from "@angular/router";
import {AdminseviceService} from "../../service/adminsevice.service";
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {

  viewMode: string = 'showmember'; // Toggle between Add Book & Display Books



  constructor(private adminService: AdminseviceService) {}



  members = [
    { memberid: 'LB0001', email: 'user1@example.com', password: 'pass123', role: 'ADMIN' },
    { memberid: 'LB0002', email: 'user2@example.com', password: 'pass456', role: 'USER' },
    { memberid: 'LB0003', email: 'user3@example.com', password: 'pass789', role: 'USER' },
    { memberid: 'LB0004', email: 'admin1@example.com', password: 'password123', role: 'ADMIN' }
  ];

  editMember(member: any) {
    console.log('Edit Member:', member);
  }

  deleteMember(memberid: any) {
    this.members = this.members.filter(member => member.memberid !== memberid);
    console.log('Deleted Member ID:', memberid);
  }

  // Add a new member functionality
  AddUser(AddUserForm: NgForm) {
    console.log(AddUserForm.value);
    const memberData = AddUserForm.value;

    this.adminService.addUserDetails(memberData).subscribe(
      response => {
        console.log('Member added successfully!', response);

      },
      error => {
        console.error('Error adding member!', error);
      }
    );
  }

  showAddUser() {

    this.viewMode = 'addmember';
  }

  showMemberList() {
    this.viewMode = 'showmember';
  }

  ManageProfile() {
    this.viewMode = 'manageprofile';
  }
}





