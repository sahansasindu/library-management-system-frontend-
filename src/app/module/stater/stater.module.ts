import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaterRoutingModule } from './stater-routing.module';
import { StaterComponent } from './stater.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";






@NgModule({
  declarations: [
    StaterComponent,
    LoginComponent,
    RegisterComponent,





  ],
  imports: [
    CommonModule,
    StaterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIcon
  ]
})
export class StaterModule { }
