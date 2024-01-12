import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { Router } from '@angular/router';
import { ILoginFormData } from '../Interfaces/ilogin-form-data';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  loginData: ILoginFormData = { "email": "", "password": "" };
  constructor(
    private loginService: LoginService,
    private router: Router) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }
  loginProcedure() {
    this.loginData.email = this.loginForm.controls['email'].value;
    this.loginData.password = this.loginForm.controls['password'].value;
    
    this.loginService.postToAuthService(this.loginData).subscribe({
      next: (response) => {
        console.log("resposne Recieved", response);
        sessionStorage.setItem('token', response);
        let loggedInUser = this.loginService.getLoggedInUserData(response);
        this.loginService.userName.next(loggedInUser.name);
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
