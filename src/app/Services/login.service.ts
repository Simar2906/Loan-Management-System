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
  loggedInUser = new BehaviorSubject<IUser | null>({
    id: 0,
    email: 'string',
    gender: 'string',
    name: 'string',
    password: 'string',
    role: 'string',
    salary:0,
    employer:'string',
    designation:'string'
  });
  constructor(private http:HttpClient) { }
  getLoggedInUserData():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.userApiURL);
  }
}
