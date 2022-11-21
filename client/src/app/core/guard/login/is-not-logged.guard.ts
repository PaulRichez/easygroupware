import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../../authentification/authentification.service';
import { TokenStorageService } from '../../services/token-storage.service';


@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedGuard implements CanActivate {
  constructor(public router: Router, private authService: AuthentificationService, private tokenStorageService: TokenStorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated() && this.tokenStorageService.getToken() !== undefined) {
     // this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
