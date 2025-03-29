import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminseviceService} from "../../service/adminsevice.service";
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent implements OnInit{

  viewMode: string = 'showmember'; // Toggle between Add Book & Display Books

  getmembers: any[] = [];
  getaccount: any[] = [];

  constructor(private adminService: AdminseviceService) {}


  ngOnInit() {
  this.fetchMemberDetails();
  this.getUserAccountDetails();

  }

  fetchMemberDetails(){
    this.adminService.getMemberDetails().subscribe((response: any) => {
        console.log("Issued Books API Response:", response);
        if (response && response.data && Array.isArray(response.data)) {
          this.getmembers = response.data;
        } else {
          this.getmembers = [];
        }
        console.log("Formatted Data:", this.getmembers);
      },
      (error) => {
        console.error("Error fetching members:", error);
        this.getmembers = [];
      });
  }



  editMember(member: any) {
    console.log('Edit Member:', member);
  }

  activeMember(account: any) {
    this.updateUserStatus(account.memberid, true);
    this.ManageProfile();
  }

  inactiveMember(account: any) {
    this.updateUserStatus(account.memberid, false);
    this.ManageProfile();
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


  getUserAccountDetails() {
    this.adminService.getUserAccountDetails().subscribe(
      (response: any) => {
        console.log("User Account Details API Response:", response);
        if (response && response.data && Array.isArray(response.data)) {
          this.getaccount = response.data;
        } else {
          this.getaccount = [];
        }
      },
      (error) => {
        console.error("Error fetching user account details:", error);
        this.getaccount = [];
      }
    );
  }


  updateUserStatus(memberId: string, newState: boolean) {
    this.adminService.updateUserState(memberId, newState).subscribe(
      response => {
        console.log('Update Successful:', response);
        alert('User state updated successfully');
      },
      error => {
        console.error('Update Failed:', error);
        alert('Failed to update user state');
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





