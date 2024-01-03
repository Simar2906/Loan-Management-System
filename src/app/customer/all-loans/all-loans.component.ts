
import { Component, Input } from '@angular/core';
import { ILoan } from 'src/app/Interfaces/iloan';
import { LoanService } from 'src/app/Services/loan.service';
@Component({
  selector: 'app-all-loans',
  templateUrl: './all-loans.component.html',
  styleUrls: ['./all-loans.component.css']
})
export class AllLoansComponent {
  @Input() id: string | undefined = ''; //auto inputted
  allLoans: ILoan[] = [];
  loanFormStatus: boolean = false;
  constructor(
    private loanService: LoanService
  ) { }
  ngOnInit() {
    this.loanService.getAllLoans().subscribe({
      next: (response) => {
        this.allLoans = response;
      },
      error: (reject) => {
        console.log(reject);
      }
    });
    this.loanService.popUpFormStatus.subscribe({
      next: (response) => {
        this.loanFormStatus = response;
      },
      error: (reject) => {
        console.log(reject);
      }
    })
  }
  applyNowClicked(loanDetails:ILoan): void {
    this.loanService.applyNewLoan(loanDetails);
  }
}
