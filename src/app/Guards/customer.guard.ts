import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { Injectable, Injector, inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
  const injector = Injector.create({ providers: [{ provide: LoginService, deps: [] }] });
  let loginService = injector.get(LoginService);
  let router = inject(Router);
  if(loginService.getLoggedInUserData(loginService.isLoggedIn()).role == "CUSTOMER")
  {
    return true;
  }
  else{
    router.navigate(['manager']);
    return false;
  }
};
