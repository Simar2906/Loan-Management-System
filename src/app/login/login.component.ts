import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { IUser } from '../Interfaces/iuser';
import { Router } from '@angular/router';
import { ILoginFormData } from '../Interfaces/ilogin-form-data';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  userData: IUser[] = [];
  loginData: ILoginFormData = { "email": "", "password": "" };
  constructor(
    private loginService: LoginService,
    private router: Router) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    this.loginService.getLoggedInUserData().subscribe({
      next: (response) => {
        this.userData = response;
        // console.log(this.userData);
      },
      error: (reject) => {
        console.log(reject);
      }
    })
  }
  loginProcedure() {
    this.loginData.email = this.loginForm.controls['email'].value;
    this.loginData.password = this.loginForm.controls['password'].value;
    this.loginService.postToAuthService(this.loginData).subscribe({
      next: (response) => {
        console.log("resposne Recieved", response);
        sessionStorage.setItem('token', response);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response);
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
        this.loginService.loggedInUser.next(loggedInUser);
        console.log('logged in');
        if (loggedInUser.role === 'CUSTOMER') {
          this.router.navigate(['/customer']);
        }
        else if (loggedInUser.role === 'MANAGER') {
          this.router.navigate(['/manager']);
        }
        else {
          this.router.navigate(['']);
        }
      },
      error: (reject) => {
        console.log(reject);
        alert('User Not found!');
        if (reject instanceof HttpErrorResponse) {
          console.log(reject.error); // Check for additional error details in the response
        }
      }
    });
  }
}
