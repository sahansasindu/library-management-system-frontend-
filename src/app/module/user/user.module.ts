import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserheaderComponent } from './component/userheader/userheader.component';
import {MatIcon} from "@angular/material/icon";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatList, MatListItem} from "@angular/material/list";
import { BookresavationComponent } from './component/bookresavation/bookresavation.component';
import { ManageprofileComponent } from './component/manageprofile/manageprofile.component';




@NgModule({
  declarations: [
    UserComponent,
    UserheaderComponent,
    DashboardComponent,
    BookresavationComponent,
    ManageprofileComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatIcon,
    MatDrawerContainer,
    MatList,
    MatListItem,
    MatDrawer,
    MatSidenavModule,


  ]
})
export class UserModule { }
