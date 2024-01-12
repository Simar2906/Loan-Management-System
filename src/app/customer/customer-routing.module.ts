import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { AppliedLoansComponent } from './applied-loans/applied-loans.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {path:'', component:CustomerComponent,
  children:[
    {path:'AllLoans', component:AllLoansComponent},
    {path:'AppliedLoans', component:AppliedLoansComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
