import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { ILoan } from '../Interfaces/iloan';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppliedLoan } from '../Interfaces/iapplied-loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  apiURLLoan:string = 'http://localhost:3000/loans';
  apiURLApplied:string = 'http://localhost:3000/appliedNewLoans';
  popUpFormStatus = new BehaviorSubject<boolean>(false);
  constructor(
    private http:HttpClient) { }
  getAllLoans():Observable<ILoan[]>{
    return this.http.get<ILoan[]>(this.apiURLLoan);
  }
  getAllApplications():Observable<IAppliedLoan[]>{
    return this.http.get<IAppliedLoan[]>(this.apiURLApplied);
  }
  applyNewLoan(){
    console.log("Loan Applied");
    this.popUpFormStatus.next(true);
  }
}
