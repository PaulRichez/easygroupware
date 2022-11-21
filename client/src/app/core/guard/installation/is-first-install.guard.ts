import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { InstallationService } from '../../services/installation.service';

@Injectable({
  providedIn: 'root'
})
export class IsFirstInstallGuard implements CanActivate {
  constructor(
    public router: Router,
    public installationService: InstallationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.installationService
      .checkFirstInstall()
      .pipe(
        map((e) =>{
          if (!e.status) {
            this.router.navigate(['/auth/login']);
          }
          return e.status
        } )
      )
  }
}
