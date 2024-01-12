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
  defaultUser = {
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
  };
  constructor(
    private loginService:LoginService,
    private router:Router
  ){}
  ngOnInit(){
    
    this.loginService.loggedInUser.subscribe({
      next:(response)=>{
        let token = this.loginService.isLoggedIn();
        if(token){
          let data = this.loginService.getLoggedInUserData(token);
          this.loginStatus = true;
          this.userName = data.name;
          console.log("Logged In Successfully");
        }
      },
      error:(reject)=>{
        console.log(reject);
      }
    })
  }
  handleLogout(){
    console.log('pressed logout');
    this.loginService.loggedInUser.next(this.defaultUser);
    this.loginStatus = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
