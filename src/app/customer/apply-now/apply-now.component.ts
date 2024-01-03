import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ILoan } from 'src/app/Interfaces/iloan';
import { LoanService } from 'src/app/Services/loan.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
})
export class ApplyNowComponent {
  applyForm:FormGroup = new FormGroup({});
  applyingLoan!:ILoan;
  constructor(private loginService:LoginService,
    private loanService:LoanService){}
  ngOnInit(){
    console.log('form opened');
    this.loanService.currentApplyingLoan.subscribe({
      next:(response)=>{
        this.applyingLoan = response;
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
    this.applyForm = new FormGroup({
      applicantName: new FormControl(this.loginService.loggedInUser.value?.name),
      applicantGender: new FormControl(this.loginService.loggedInUser.value?.gender),
      applicantEmployer: new FormControl(this.loginService.loggedInUser.value?.employer),
      applicantSalary: new FormControl(this.loginService.loggedInUser.value?.salary),
      applicantDesignation: new FormControl(this.loginService.loggedInUser.value?.designation),
      amountApplied: new FormControl(),
      interestRate: new FormControl(),
      processingFee: new FormControl(100),
      termLength: new FormControl(),
      dateApplied: new FormControl(new Date())
    })
  }
  ngOnDestroy(){
    console.log('form closed');
  }
}
