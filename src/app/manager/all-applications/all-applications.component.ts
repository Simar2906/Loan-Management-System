import { Component } from '@angular/core';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { ILoan } from 'src/app/Interfaces/iloan';
import { LoanService } from 'src/app/Services/loan.service';

@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.css']
})
export class AllApplicationsComponent {
allApps:IAppliedLoan[] = [];
fetched:boolean = false;
constructor(protected loanService:LoanService){}

ngOnInit(){
  this.loanService.getAllApplications().subscribe({
    next:(response)=>{
      this.fetched = true;
      this.allApps = response;
    },
    error:(reject)=>{
      this.fetched = true;
      console.log(reject);
    }
  });
}
}
