import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './Guards/auth.guard';
import { customerGuard } from './Guards/customer.guard';
import { managerGuard } from './Guards/manager.guard';
import { loginGuard } from './Guards/login.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent, canActivate:[loginGuard]},
  {path:'customer', loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule),
  canActivate: [authGuard, customerGuard]},
  {path:'manager', loadChildren:()=>import('./manager/manager.module').then(m=>m.ManagerModule),
  canActivate: [authGuard, managerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
