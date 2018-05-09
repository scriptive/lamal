import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()

export class GuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.authService.hasSignedIn();
    if ( this.authService.hasSignedIn() ) {
        return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
