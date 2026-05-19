import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {BookresavationComponent} from "./component/bookresavation/bookresavation.component";
import {ManageuserprofileComponent} from "./component/manageuserprofile/manageuserprofile.component";
import {HistoryComponent} from "./component/history/history.component";
import {authGuard} from "../../guard/auth.guard";


const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },
      { path: 'reservation', component: BookresavationComponent },
      { path: 'manageuserprofile', component: ManageuserprofileComponent },
      { path: 'history', component: HistoryComponent },


    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
