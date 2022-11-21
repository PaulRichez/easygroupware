import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
    const token = localStorage.getItem('token')
    if (token) {
      sessionStorage.setItem('token', token);
    }
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  setToken(token: string, remenberMe: boolean) {
    sessionStorage.setItem('token', token)
    if (remenberMe) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isTokenAvailable(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getDecodedToken() {
    const token = this.getToken();
    if (token) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  clearStorage() {
    sessionStorage.clear();
    localStorage.clear();
  }
}
