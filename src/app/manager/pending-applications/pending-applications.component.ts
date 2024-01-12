import { Component } from '@angular/core';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { LoanService } from 'src/app/Services/loan.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-pending-applications',
  templateUrl: './pending-applications.component.html',
  styleUrls: ['./pending-applications.component.css']
})
export class PendingApplicationsComponent {
  constructor(protected loanService: LoanService,
    private notificationService:NotificationService) { }
  pendingApps: IAppliedLoan[] = [];
  fetched:boolean = false;
  ngOnInit(){
    this.loanService.getAllApplications().subscribe({
      next:(response)=>{
        this.pendingApps = response.filter(v=>v.pending == true);
        this.fetched = true;
        console.log(this.pendingApps);
      },
      error:(reject)=>{
        this.fetched = true;
        console.log(reject);
      }
    })
  }
  actOnLoan(loanId:number, status:string){
    this.loanService.updateLoan(loanId, status).subscribe({
      next:(response)=>{
        console.log('Updated Successfully');
        this.pendingApps = this.pendingApps.filter(v=>v.id != loanId);
        this.notificationService.notify(`Loan ${status}d Successfully`);
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
  }
}
