import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Interfaces/iuser';
import { BehaviorSubject } from 'rxjs';
import { ILoginFormData } from '../Interfaces/ilogin-form-data';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userApiURL: string = "http://localhost:3000/user";
  authURL: string = "https://localhost:7028/Auth";
  userName: BehaviorSubject<string> = new BehaviorSubject('DefaultUser');
  constructor(private http: HttpClient) { }
  isLoggedIn():string|null {
    let token = sessionStorage.getItem('token');
    return token;
  }
  getLoggedInUserData(token: any): IUser {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let loggedInUser: IUser = {
      "id": parseInt(decodedToken.id),
      "email": decodedToken.email,
      "gender": decodedToken.gender,
      "name": decodedToken.name,
      "password": decodedToken.password,
      "role": decodedToken.role,
      "salary": parseInt(decodedToken.salary),
      "employer": decodedToken.employer,
      "designation": decodedToken.designation,
      "userPic": decodedToken.userPic
    }
    console.log(loggedInUser);
    return loggedInUser;
  }
  postToAuthService(loginDetails: ILoginFormData): Observable<string> {
    console.log(loginDetails);
    return this.http.post(this.authURL,
      loginDetails,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      });
  }

}
