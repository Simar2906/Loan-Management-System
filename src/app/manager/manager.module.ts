import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager/manager.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { ApprovedApplicationsComponent } from './approved-applications/approved-applications.component';
import { RejectedApplicationsComponent } from './rejected-applications/rejected-applications.component';
import { MatCardModule } from '@angular/material/card';
import { PendingApplicationsComponent } from './pending-applications/pending-applications.component';



@NgModule({
  declarations: [
    ManagerComponent,
    AllApplicationsComponent,
    ApprovedApplicationsComponent,
    RejectedApplicationsComponent,
    PendingApplicationsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatCardModule
  ]
})
export class ManagerModule { }
