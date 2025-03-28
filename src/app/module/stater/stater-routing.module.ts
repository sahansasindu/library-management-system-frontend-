import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaterComponent } from './stater.component';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";


const routes: Routes = [
  {
    path: '',
    component: StaterComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaterRoutingModule { }
