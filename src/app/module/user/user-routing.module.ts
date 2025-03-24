import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import {DashboardComponent} from "./component/dashboard/dashboard.component";


const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect to DashboardComponent
      { path: 'dashboard', component: DashboardComponent },

    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
