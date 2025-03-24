import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotfoundpageComponent} from "./component/notfoundpage/notfoundpage.component";




const routes: Routes = [
  { path: '', redirectTo:'stater',pathMatch:'full'},
  { path: 'stater', loadChildren: () => import('./module/stater/stater.module').then(m => m.StaterModule)},
  { path: 'user', loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)},
  { path: 'admin', loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule) },
  {path:'**',component:NotfoundpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
