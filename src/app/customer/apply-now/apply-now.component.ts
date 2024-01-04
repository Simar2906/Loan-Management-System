import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  range:number[] = [0, 0];
  loanRange:number[] = [5000, 100000];
  constructor(private loginService:LoginService,
    private loanService:LoanService){}
  ngOnInit(){
    this.applyForm = new FormGroup({
      applicantName: new FormControl(this.loginService.loggedInUser.value?.name),
      applicantGender: new FormControl(this.loginService.loggedInUser.value?.gender),
      applicantEmployer: new FormControl(this.loginService.loggedInUser.value?.employer),
      applicantSalary: new FormControl(this.loginService.loggedInUser.value?.salary),
      applicantDesignation: new FormControl(this.loginService.loggedInUser.value?.designation),
      amountApplied: new FormControl(null, [Validators.required, Validators.min(this.loanRange[0]), Validators.max(this.loanRange[1])]),
      interestRate: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      processingFee: new FormControl(100),
      termLength: new FormControl(null, [Validators.required, Validators.min(0.1), Validators.max(40)]),
      dateApplied: new FormControl(new Date())
    })
    console.log('form opened');
    this.loanService.currentApplyingLoan.subscribe({
      next:(response)=>{
        this.applyingLoan = response;
        this.range = response.interestRates.split('-').map(v=>parseFloat(v.slice(0, -1)));
        // range -> min, max
        // console.log(range);
        this.applyForm.get('interestRate')?.setValidators([
          Validators.required,
          Validators.min(this.range[0]),
          Validators.max(this.range[1]),
        ]);
        this.applyForm.updateValueAndValidity();
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
    
  }
  cancelApply(){
    this.loanService.popUpFormStatus.next(false);
  }
  applyLoan(){

  }
  ngOnDestroy(){
    console.log('form closed');
  }
}
