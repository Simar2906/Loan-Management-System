import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'customer', loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule),
  canActivate: [authGuard]},
  {path:'manager', loadChildren:()=>import('./manager/manager.module').then(m=>m.ManagerModule),
  canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
