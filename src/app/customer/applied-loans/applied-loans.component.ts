import { Component, Input} from '@angular/core';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { LoanService } from 'src/app/Services/loan.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-applied-loans',
  templateUrl: './applied-loans.component.html',
  styleUrls: ['./applied-loans.component.css']
})
export class AppliedLoansComponent {
  @Input() id:string|undefined = '';
  appliedLoans:IAppliedLoan[] = [];
  empty:boolean = false;
  constructor(
    private loanService:LoanService,
    private loginService:LoginService
  ){}
  ngOnInit(){
    this.loanService.getAllApplications().subscribe({
      next:(response)=>{
        this.appliedLoans = response.filter((data)=>{
          return this.loginService.loggedInUser.getValue()?.email == data.email;
        });
        if(this.appliedLoans.length == 0){
          this.empty = true;
        }
      },
      error:(reject)=>{
        console.log(reject);
      }
    });
  }
}
