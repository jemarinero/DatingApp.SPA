import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../services/auth.service';
import { AlertifyService } from './../services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authServce: AuthService, 
    private router: Router, 
    private alertify: AlertifyService){}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authServce.loggedIn()) return true;

    this.alertify.error('You need not be loggin to acces this area');
    this.router.navigate(['/home']);
    return false;
  }
}
