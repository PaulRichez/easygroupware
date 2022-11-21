import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { InstallationService } from '../../services/installation.service';

@Injectable({
  providedIn: 'root'
})
export class IsCurrentStep implements CanActivate {
  constructor(
    public router: Router,
    public installationService: InstallationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!route.data['step']) {
      this.router.navigate(['/setup/start'])
      return false;
    }
    if (this.installationService.currentStep < route.data['step']) {
      this.router.navigate(['/setup/start'])
      return false;
    }
    return true;
  }
}
