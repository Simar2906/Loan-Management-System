import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let token = sessionStorage.getItem('token');

  if(token){
    return true;
  }
  else{
    return false;
  }
};
