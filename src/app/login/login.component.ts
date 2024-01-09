import { Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../Services/login.service';
import { IUser } from '../Interfaces/iuser';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});
  userData: IUser[] = [];
  constructor(
    private loginService:LoginService,
    private router:Router,
    private authService:AuthService){}
  ngOnInit(){
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
    this.loginService.getLoggedInUserData().subscribe({
      next:(response)=>{
        this.userData = response;
        // console.log(this.userData);
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
  }
  loginProcedure(){
    let loggedInUser= this.userData.find((data)=>{
      return data.email === this.loginForm.value.email
      &&  data.password === this.loginForm.value.password;
    });
    if(loggedInUser == undefined){
      alert('User Not found!');
    }
    else{

      this.loginService.loggedInUser.next(loggedInUser);
      this.authService.createToken(loggedInUser, '1h'); // creating session token
      console.log('logged in');
      
      if(loggedInUser.role ==='CUSTOMER'){
        this.router.navigate(['/customer']);
      }
      else if(loggedInUser.role ==='MANAGER'){
        this.router.navigate(['/manager']);
      }
      else{
        this.router.navigate(['']);
      }
      
    }
  }
}
