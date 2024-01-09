import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../Interfaces/iuser';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userApiURL : string = "http://localhost:3000/user";
  loggedInUser = new BehaviorSubject<IUser>({
    id: 0,
    email: 'string',
    gender: 'string',
    name: 'string',
    password: 'string',
    role: 'string',
    salary:0,
    employer:'string',
    designation:'string',
    userPic:'https://th.bing.com/th/id/R.6b8116709b552debd21f945a068cc706?rik=taVwHpn%2f6WYV%2fw&riu=http%3a%2f%2fgetdrawings.com%2fimg%2fgeneric-person-silhouette-16.jpg&ehk=jM3MuZUcM%2f2Ms9IF9vEIERcBXtazJmmHXRgh0bXKO1Q%3d&risl=&pid=ImgRaw&r=0'
  });
  constructor(private http:HttpClient) { }
  getLoggedInUserData():Observable<IUser[]>{
    return this.http.get<IUser[]>(this.userApiURL);
  }
}
