import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AdminseviceService } from "../../service/adminsevice.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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


  constructor(
    private adminService: AdminseviceService,
    private snackBar: MatSnackBar
  ) { }


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
        this.snackBar.open('Member added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        AddUserForm.reset();
        this.fetchMemberDetails();
      },
      error => {
        console.error('Error adding member!', error);
        this.snackBar.open('Failed to add member. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
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

        const account = this.getaccount.find(acc => acc.memberid === memberId);
        if (account) {
          account.active_state = newState;
        }
        this.snackBar.open('User state updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error => {
        console.error('Update Failed:', error);
        this.snackBar.open('Failed to update user state', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
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





