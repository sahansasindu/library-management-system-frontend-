import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatList, MatListItem, MatListModule} from "@angular/material/list";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { NotfoundpageComponent } from './component/notfoundpage/notfoundpage.component';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    NotfoundpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    MatDrawerContainer,
    MatList,
    MatListItem,
    MatIcon,
    MatDrawer,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
