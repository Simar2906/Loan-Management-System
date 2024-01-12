import { Component } from '@angular/core';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { LoanService } from 'src/app/Services/loan.service';

@Component({
  selector: 'app-rejected-applications',
  templateUrl: './rejected-applications.component.html',
  styleUrls: ['./rejected-applications.component.css']
})
export class RejectedApplicationsComponent {
  allApps:IAppliedLoan[] = [];
  fetched:boolean = false;
  constructor(protected loanService:LoanService){}
  
  ngOnInit(){
    this.loanService.getAllApplications().subscribe({
      next:(response)=>{
        this.fetched = true;
        this.allApps = response.filter((data)=>{
          return data.rejected === true && data.approved === false;
        });
      },
      error:(reject)=>{
        this.fetched = true;
        console.log(reject);
      }
    });
  }
}
