import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'customer', loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule)},
  {path:'manager', loadChildren:()=>import('./manager/manager.module').then(m=>m.ManagerModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {bindToComponentInputs:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
