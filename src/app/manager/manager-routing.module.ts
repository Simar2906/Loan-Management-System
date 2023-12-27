import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { AllApplicationsComponent } from './all-applications/all-applications.component';
import { ApprovedApplicationsComponent } from './approved-applications/approved-applications.component';
import { RejectedApplicationsComponent } from './rejected-applications/rejected-applications.component';

const routes: Routes = [
  {path:'', component:ManagerComponent,
  children:[
    {path:'AllApps', component:AllApplicationsComponent},
    {path:'ApprovedApps', component:ApprovedApplicationsComponent},
    {path:'RejectedApps', component:RejectedApplicationsComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
