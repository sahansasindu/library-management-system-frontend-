import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import { AdminheaderComponent } from './component/adminheader/adminheader.component';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { AddbookComponent } from './component/addbook/addbook.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ManageprofileComponent } from './component/manageprofile/manageprofile.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminheaderComponent,
    AdmindashboardComponent,
    AdduserComponent,
    AddbookComponent,
    ManageprofileComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MatIcon,
    MatList,
    MatListItem,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
