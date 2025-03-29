import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AdmindashboardComponent} from "./component/admindashboard/admindashboard.component";
import {AdduserComponent} from "./component/adduser/adduser.component";
import {AddbookComponent} from "./component/addbook/addbook.component";
import {ManageprofileComponent} from "./component/manageprofile/manageprofile.component";
import {BookCiculationComponent} from "./component/book-ciculation/book-ciculation.component";
import {FeesManagementComponent} from "./component/fees-management/fees-management.component";
import {authGuard} from "../../guard/auth.guard";

const routes: Routes = [{ path: '', component: AdminComponent,children:[
    {path: '', redirectTo: 'admindashboard', pathMatch: 'full' },
    {path:'admindashboard',component:AdmindashboardComponent,canActivate:[authGuard]},
    {path:'adduser',component:AdduserComponent},
    {path:'addbook',component:AddbookComponent},
    {path:'manageprofile',component:ManageprofileComponent},
    {path:'bookcirculation',component:BookCiculationComponent},
    {path:'managefees',component:FeesManagementComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
