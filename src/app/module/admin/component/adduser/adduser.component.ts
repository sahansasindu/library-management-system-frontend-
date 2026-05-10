import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AdminseviceService } from "../../service/adminsevice.service";
@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss'
})
export class AdduserComponent implements OnInit {

  viewMode: string = 'showmember';

  getmembers: any[] = [];
  getaccount: any[] = [];


  page: number = 0;
  size: number = 5;
  searchText: string = '';
  totalMembers: number = 0;


  constructor(private adminService: AdminseviceService) { }


  ngOnInit() {
    this.fetchMemberDetails();
    this.getUserAccountDetails();

  }

  fetchMemberDetails() {
    this.adminService.getMemberDetails(this.page, this.size, this.searchText).subscribe((response: any) => {
      console.log("Member Details API Response:", response);
      if (response && response.data) {
        this.getmembers = response.data.dataList || [];
        this.totalMembers = response.data.dataCount || 0;
      } else {
        this.getmembers = [];
        this.totalMembers = 0;
      }
      console.log("Formatted Data:", this.getmembers);
    },
      (error) => {
        console.error("Error fetching members:", error);
        this.getmembers = [];
      });
  }

  onSearchChange() {
    this.page = 0;
    this.fetchMemberDetails();
  }

  nextPage() {
    if ((this.page + 1) * this.size < this.totalMembers) {
      this.page++;
      this.fetchMemberDetails();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchMemberDetails();
    }
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


  AddUser(AddUserForm: NgForm) {
    console.log(AddUserForm.value);
    const memberData = AddUserForm.value;

    this.adminService.addUserDetails(memberData).subscribe(
      response => {
        console.log('Member added successfully!', response);
        alert('Member added successfully!');
        AddUserForm.reset();
        this.fetchMemberDetails(); // Refresh the list
      },
      error => {
        console.error('Error adding member!', error);
        alert('Failed to add member. Please try again.');
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





