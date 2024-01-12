import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  id:string|undefined= '';
  constructor(
    private loginService:LoginService){}
  ngOnInit(){
    let token = this.loginService.isLoggedIn();
    this.id = this.loginService.getLoggedInUserData(token).id.toString();
    console.log('logged in id is: ', this.id);
  }
}
