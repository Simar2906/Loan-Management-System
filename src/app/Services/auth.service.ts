import { Injectable } from '@angular/core';
import { IUser } from '../Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  secretKey:string = "myKey";
  constructor() { }

  createToken(loginDetails: IUser, time:string){
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(loginDetails, this.secretKey, { expiresIn: time });
    sessionStorage.setItem('token',token);
  }
  getToken(){
    return sessionStorage.getItem('token');
  }
  removeToken(){
    sessionStorage.removeItem('token');
  }
}
