import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaterRoutingModule } from './stater-routing.module';
import { StaterComponent } from './stater.component';
import { StaterheaderComponent } from './component/staterheader/staterheader.component';
import { StaterfooterComponent } from './component/staterfooter/staterfooter.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";






@NgModule({
  declarations: [
    StaterComponent,
    StaterheaderComponent,
    StaterfooterComponent,
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
