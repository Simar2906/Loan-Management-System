import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../login/iuser';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userApiURL : string = "http://localhost:3000/user"
  loggedInUser = new BehaviorSubject<IUser|null>(null);
  constructor(private http:HttpClient) { }
  getLoggedInUserData():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.userApiURL);
  }
}
