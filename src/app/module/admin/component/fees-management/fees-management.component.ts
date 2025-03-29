import {Component, OnInit} from '@angular/core';
import {AdminseviceService} from "../../service/adminsevice.service";

@Component({
  selector: 'app-fees-management',
  templateUrl: './fees-management.component.html',
  styleUrl: './fees-management.component.scss'
})
export class FeesManagementComponent implements OnInit {

  viewMode: string = 'displayfees';
  feeData: any[] = [];
  newFee = { entry_payment: 0, penalty_cost: 0 };

  constructor(private adminService: AdminseviceService) {}

  ngOnInit(): void {
    this.getFees();
  }

  addfees() {
    this.viewMode = 'addfees';
  }

  displayfees() {
    this.viewMode = 'displayfees';
    this.getFees();
  }

  getFees() {
    this.adminService.getFeeInformation().subscribe((response) => {
      this.feeData = response.data;
    });
  }

  addFee() {
    this.adminService.addFeeInformation(this.newFee).subscribe((response) => {
      alert('Fee added successfully');
      this.displayfees();
    });
  }

  updatefees(feeData: any[]) {

  }
}
