import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-apply-now',
  templateUrl: './apply-now.component.html',
  styleUrls: ['./apply-now.component.css']
})
export class ApplyNowComponent {
  applyForm:FormGroup = new FormGroup({});
  constructor(private loginService:LoginService){}
  ngOnInit(){
    this.applyForm = new FormGroup({
      applicantName: new FormControl(this.loginService.loggedInUser.value?.name),
      applicantGender: new FormControl(this.loginService.loggedInUser.value?.gender),
      applicantEmployer: new FormControl(),
      applicantSalary: new FormControl(),
      applicantDesignation: new FormControl(),
      amountApplied: new FormControl(),
      interestRate: new FormControl(),
      processingFee: new FormControl(),
      termLength: new FormControl(),
      dateApplied: new FormControl()
    })
  }
}
