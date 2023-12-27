import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { AllLoansComponent } from './all-loans/all-loans.component';
import { AppliedLoansComponent } from './applied-loans/applied-loans.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    CustomerComponent,
    AllLoansComponent,
    AppliedLoansComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatCardModule,
    MatTableModule
    
  ]
})
export class CustomerModule { 
  constructor(){
    console.log('Customers Created');
  }
}
