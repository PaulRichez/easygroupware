import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RememberMeService {

  constructor() { }

  setRememberMe(rememberMe: boolean) {
    localStorage.setItem('rememberMe', rememberMe.toString());
  }

  getRememberMe() {
    return localStorage.getItem('rememberMe') === 'true';
  }
}
