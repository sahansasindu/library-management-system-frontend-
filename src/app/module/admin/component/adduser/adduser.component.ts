import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserserviceService} from "../../../stater/service/userservice.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent {



  constructor(private registerUser:UserserviceService) {
  }



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

  AddUser(AddUserForm: NgForm) {
    console.log(AddUserForm.value);
    this.registerUser.register(AddUserForm.value).subscribe(
      response => {
        console.log("Registration successful!", response);
      },
      error => {
        console.error("Registration failed!", error);
      }
    );
  }

  }





