import { Component, Input } from '@angular/core';
import { LoginService } from './Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LoanManagementSystem';
  loginStatus:boolean = false;
  userName: any = '';
  constructor(
    private loginService:LoginService,
    private router:Router
  ){}
  ngOnInit(){
    this.loginService.loggedInUser.subscribe({
      next:(response)=>{
        if(response != undefined || response != null){
          this.loginStatus = true;
          this.userName = this.loginService.loggedInUser.getValue()?.name;
        }
        else{
          this.router.navigate(['/login']);
        }
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
  }
  handleLogout(){
    console.log('pressed logout');
    this.loginService.loggedInUser.next(null);
    this.loginStatus = false;
    this.router.navigate(['/login']);
  }
}
