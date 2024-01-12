import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { Injector, inject } from '@angular/core';

export const managerGuard: CanActivateFn = (route, state) => {
  const injector = Injector.create({ providers: [{ provide: LoginService, deps: [] }] });
  let loginService = injector.get(LoginService);
  let router = inject(Router);
  if(loginService.getLoggedInUserData(loginService.isLoggedIn()).role == "MANAGER")
  {
    return true;
  }
  else{
    router.navigate(['customer']);
    return false;
  }
};
