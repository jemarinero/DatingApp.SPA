import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model)
      .subscribe(data => {
        this.alertify.success('logged in successfully');
      },
      error => {
        this.alertify.error('Failed to Login');
      }, () => {
        this.router.navigate(['/members']);
      });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  getUsername() {
    return this.authService.decodedToken.unique_name;
  }
}
