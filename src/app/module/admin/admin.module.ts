import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatList, MatListItem} from "@angular/material/list";
import { HeaderComponent } from '../../component/header/header.component';
import { AdmindashboardComponent } from './component/admindashboard/admindashboard.component';
import { AdduserComponent } from './component/adduser/adduser.component';
import { AddbookComponent } from './component/addbook/addbook.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ManageprofileComponent } from './component/manageprofile/manageprofile.component';
import { BookCiculationComponent } from './component/book-ciculation/book-ciculation.component';
import { ManageFinesComponent } from './component/manage-fines/manage-fines.component';

import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { RecentTransactionsComponent } from '../../component/recent-transactions/recent-transactions.component';
import { BookCategoriesComponent } from '../../component/book-categories/book-categories.component';
import { ManageProfileComponent } from '../../component/manage-profile/manage-profile.component';
import { BookCardComponent } from '../../component/book-card/book-card.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";

@NgModule({
  declarations: [
    AdminComponent,
    AdmindashboardComponent,
    AdduserComponent,
    AddbookComponent,
    ManageprofileComponent,
    BookCiculationComponent,
    ManageFinesComponent
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
    ReactiveFormsModule,
    HeaderComponent,
    SidebarComponent,
    RecentTransactionsComponent,
    BookCategoriesComponent,
    ManageProfileComponent,
    BookCardComponent,
    MatSnackBarModule,
    MatPaginatorModule
  ]
})
export class AdminModule { }
