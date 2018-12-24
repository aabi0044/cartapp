import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route:ActivatedRouteSnapshot): boolean {
    if (!this.auth.isLogedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
