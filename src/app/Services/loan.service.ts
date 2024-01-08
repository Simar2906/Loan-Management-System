import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ILoan } from '../Interfaces/iloan';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppliedLoan } from '../Interfaces/iapplied-loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  apiURLLoan: string = 'http://localhost:3000/loans';
  apiURLApplied: string = 'http://localhost:3000/appliedNewLoans';
  currentApplyingLoan = new BehaviorSubject<ILoan>({
    logo: 'string',
    title: 'string',
    loanAmount: 'string',
    interestRates: 'string',
    Mincreditscore: 660,
    TermLength: 4,
    ProcessingFee: 100
  });
  popUpFormStatus = new BehaviorSubject<boolean>(false);
  currentId = new BehaviorSubject<number>(-1);
  constructor(
    private http: HttpClient) {
      this.getAllApplications().subscribe({
        next:(response)=>{
          this.currentId.next(Math.max(...response.map(loan=>loan.id)));
          console.log('loanBase is '+this.currentId.value);
        },
        error:(reject)=>{
          console.log(reject);
        }
      })
     }
  yearsToYearsMonthsDays(totalYears:number):any {
    const years = Math.floor(totalYears);
    const decimalMonths = (totalYears - years) * 12;
    const months = Math.floor(decimalMonths);
    const days = Math.floor((decimalMonths - months) * 30.44);
  
    return { years, months, days };
  }
  getAllLoans(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(this.apiURLLoan);
  }
  getAllApplications(): Observable<IAppliedLoan[]> {
    return this.http.get<IAppliedLoan[]>(this.apiURLApplied);
    //limitation of APi as not indexed on user
  }
  applyNewLoanClicked(loanDetails: ILoan) {
    console.log("Loan Applied");

    this.currentApplyingLoan.next(loanDetails);
    this.popUpFormStatus.next(true);
  }
  registerNewLoan(loanDetails: IAppliedLoan): Observable<IAppliedLoan> {
    return this.http.post<IAppliedLoan>(this.apiURLApplied, loanDetails,
      {
        headers: new HttpHeaders({ 'content-type': 'application/json' })
      })
  }
  getLoanStatus(loan:IAppliedLoan):string{
    if(loan.rejected == false && loan.approved == false){
      return 'pending';
    }
    else if(loan.rejected == true){
      return 'rejected';
    }
    else{
      return 'approved';
    }
  }
  updateLoan(loanID:number, action:string):Observable<IAppliedLoan>{
    let api = this.apiURLApplied + '/' + loanID;
    if(action == 'approve'){
      return this.http.patch<IAppliedLoan>(api, 
        {['approved']: true,
        ['rejected']: false,
        ['pending']:false});
    }
    else{
      return this.http.patch<IAppliedLoan>(api, 
        {['approved']: false,
        ['rejected']: true,
        ['pending']:false
    });
    }
  }
}
