import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppliedLoan } from 'src/app/Interfaces/iapplied-loan';
import { ILoan } from 'src/app/Interfaces/iloan';
import { IUser } from 'src/app/Interfaces/iuser';
import { LoanService } from 'src/app/Services/loan.service';
import { LoginService } from 'src/app/Services/login.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
})
export class ApplyNowComponent {
  applyForm: FormGroup = new FormGroup({});
  applyingLoan!: ILoan;
  finalDetails!: IAppliedLoan;
  range: number[] = [0, 0];
  loanRange: number[] = [5000, 100000];
  currentUserData!:IUser;
  constructor(private loginService: LoginService,
    private loanService: LoanService,
    private notificationService: NotificationService) { }
  ngOnInit() {
    this.currentUserData = this.loginService.getLoggedInUserData(this.loginService.isLoggedIn());
    
    this.applyForm = new FormGroup({
      applicantName: new FormControl(this.currentUserData.name),
      applicantGender: new FormControl(this.currentUserData.gender),
      applicantEmployer: new FormControl(this.currentUserData.employer),
      applicantSalary: new FormControl(this.currentUserData.salary),
      applicantDesignation: new FormControl(this.currentUserData.designation),
      amountApplied: new FormControl(null, [Validators.required, Validators.min(this.loanRange[0]), Validators.max(this.loanRange[1])]),
      interestRate: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      processingFee: new FormControl(),
      termLength: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(40)]),
      dateApplied: new FormControl(new Date())
    })
    console.log('form opened');
    this.loanService.currentApplyingLoan.subscribe({
      next: (response) => {
        this.applyingLoan = response;
        this.applyForm.controls['processingFee'] = new FormControl(this.applyingLoan.ProcessingFee);
        this.range = response.interestRates.split('-').map(v => parseFloat(v.slice(0, -1)));
        // range -> min, max
        // console.log(range);
        this.applyForm.get('termLength')?.setValidators([
          Validators.required, 
          Validators.min(this.applyingLoan.TermLength), 
          Validators.max(40)
        ])
        this.applyForm.get('interestRate')?.setValidators([
          Validators.required,
          Validators.min(this.range[0]),
          Validators.max(this.range[1]),
        ]);
        this.applyForm.updateValueAndValidity();
      },
      error: (reject) => {
        console.log(reject);
      }
    })

  }
  cancelApply() {
    this.loanService.popUpFormStatus.next(false);
  }
  applyLoan() {
    //create logic
    console.log(this.applyForm.value);
    this.finalDetails = {
      email: this.currentUserData.email,
      gender: this.currentUserData.gender,
      name: this.currentUserData.name,
      password: this.currentUserData.password,
      role: this.currentUserData.role,
      customerPicture: this.currentUserData.userPic,
      logo: this.applyingLoan.logo,
      title: this.applyingLoan.title,
      loanAmount: this.applyingLoan.loanAmount,
      appliedAmount: parseInt(this.applyForm.value.amountApplied),
      interestRates: this.applyingLoan.interestRates,
      designatedRate: parseFloat(this.applyForm.value.interestRate),
      Mincreditscore: this.applyingLoan.Mincreditscore,
      TermLength: parseFloat(this.applyForm.value.termLength),
      ProcessingFee: parseInt(this.applyForm.value.processingFee),
      currentemployer: this.currentUserData.employer,
      designation: this.applyForm.value.applicantDesignation,
      salary: this.currentUserData.salary,
      approved: false,
      rejected: false,
      pending: true,
      dateApplied: this.applyForm.value.dateApplied,
      id: this.loanService.currentId.value + 1
    }
    this.loanService.currentId.next(this.loanService.currentId.value + 1);
    console.log(this.finalDetails);
    this.loanService.registerNewLoan(this.finalDetails).subscribe({
      next: (response) => {
        console.log('Form Data Uploaded successfully!');
      },
      error: (reject) => {
        console.log(reject);
      }
    });
    this.loanService.popUpFormStatus.next(false);
    this.notificationService.notify("Loan Applied Successfully");
  }
  ngOnDestroy() {
    console.log('form closed');
  }
}
