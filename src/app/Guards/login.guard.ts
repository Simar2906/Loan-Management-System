import { Injector, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const injector = Injector.create({ providers: [{ provide: LoginService, deps: [] }] });
  let loginService = injector.get(LoginService);
  let router = inject(Router);
  if(loginService.isLoggedIn())
  {
    let newRoute:string = '';
    newRoute=loginService.getLoggedInUserData(loginService.isLoggedIn()).role.toLowerCase();
    router.navigate([newRoute]);
    return false;
  }
  else{
    return true;
  }
};
