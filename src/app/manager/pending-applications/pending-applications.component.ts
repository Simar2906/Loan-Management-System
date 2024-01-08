import { Component } from '@angular/core';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { LoanService } from 'src/app/Services/loan.service';

@Component({
  selector: 'app-pending-applications',
  templateUrl: './pending-applications.component.html',
  styleUrls: ['./pending-applications.component.css']
})
export class PendingApplicationsComponent {
  constructor(protected loanService: LoanService) { }
  pendingApps: IAppliedLoan[] = [];

  ngOnInit(){
    this.loanService.getAllApplications().subscribe({
      next:(response)=>{
        this.pendingApps = response.filter(v=>v.pending == true);
        console.log(this.pendingApps);
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
  }
  actOnLoan(loanId:number, status:string){
    this.loanService.updateLoan(loanId, status).subscribe({
      next:(response)=>{
        console.log('Updated Successfully');
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
  }
}
