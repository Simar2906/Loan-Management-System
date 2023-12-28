import { Component } from '@angular/core';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { LoanService } from 'src/app/Services/loan.service';

@Component({
  selector: 'app-approved-applications',
  templateUrl: './approved-applications.component.html',
  styleUrls: ['./approved-applications.component.css']
})
export class ApprovedApplicationsComponent {
  allApps:IAppliedLoan[] = [];
  
  constructor(private loanService:LoanService){}
  
  ngOnInit(){
    this.loanService.getAllApplications().subscribe({
      next:(response)=>{
        this.allApps = response.filter((data)=>{
          return data.approved === true;
        });
      },
      error:(reject)=>{
        console.log(reject);
      }
    });
  }
}
