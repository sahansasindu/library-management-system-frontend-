import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatIcon } from "@angular/material/icon";
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from "@angular/material/sidenav";
import { MatList, MatListItem } from "@angular/material/list";
import { BookresavationComponent } from './component/bookresavation/bookresavation.component';
import { ManageuserprofileComponent } from './component/manageuserprofile/manageuserprofile.component';
import { AiAssistantComponent } from './component/ai-assistant/ai-assistant.component';
import { HistoryComponent } from './component/history/history.component';
import { FormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";

import { HeaderComponent } from '../../component/header/header.component';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { ManageProfileComponent } from '../../component/manage-profile/manage-profile.component';
import { BookCategoriesComponent } from '../../component/book-categories/book-categories.component';
import { BookCardComponent } from '../../component/book-card/book-card.component';

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    BookresavationComponent,
    ManageuserprofileComponent,
    AiAssistantComponent,
    HistoryComponent
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
    FormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    HeaderComponent,
    SidebarComponent,
    ManageProfileComponent,
    BookCategoriesComponent,
    BookCardComponent
  ]
})
export class UserModule { }
