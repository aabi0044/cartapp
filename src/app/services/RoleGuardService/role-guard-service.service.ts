import { Injectable } from '@angular/core';
import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {

 
  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('type');
    console.log(token);
    // decode the token to get its payload
    // const tokenPayload = decode(token);
    // console.log(tokenPayload);
    if (
      !this.auth.isLogedIn() || 
      token !== expectedRole
      
    ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
