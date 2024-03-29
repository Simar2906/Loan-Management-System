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
  id:string|undefined = '';
  appliedLoans:IAppliedLoan[] = [];
  termObject = {};
  empty:boolean = false;
  constructor(
    protected loanService:LoanService,
    private loginService:LoginService
  ){}
  ngOnInit(){
    this.loanService.getAllApplications().subscribe({
      next:(response)=>{
        let userData = this.loginService.getLoggedInUserData(this.loginService.isLoggedIn());
        this.id = userData.id.toString();
        this.appliedLoans = response.filter((data)=>{
          return userData.email == data.email;
        });
        console.log(this.appliedLoans);
        if(this.appliedLoans.length == 0){
          this.empty = true;
        }
      },
      error:(reject)=>{
        console.log(reject);
      }
    });
  }
  createTime(time:any){
    return this.loanService.yearsToYearsMonthsDays(time);
  }
}
