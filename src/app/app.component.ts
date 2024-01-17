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
  loginStatus: boolean = false;
  showDashboardLink: boolean = true;
  userName: any = '';
  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }
  ngOnInit() {
    let token = this.loginService.isLoggedIn();
    this.loginService.userName.subscribe({
      next: (respose) => {
        if (this.loginService.userName.value != 'DefaultUser') {
          this.userName = this.loginService.userName.value;
          this.loginStatus = true;
        }
      },
      error: (reject) => {
        console.log(reject);
      }
    })
    if (token) {
      let data = this.loginService.getLoggedInUserData(token);
      this.loginStatus = true;
      this.userName = data.name;
      console.log("Logged In Successfully");
    }
  }
  isHomeRoute(): boolean {
    return this.router.url === '/';
  }
  redirectToLogin(): void {
    this.showDashboardLink = false;
    this.router.navigate(['/login']);
  }
  handleLogout() {
    console.log('pressed logout');
    this.loginStatus = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
