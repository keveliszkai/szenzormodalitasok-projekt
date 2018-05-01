import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoginData } from '../models/login-data.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { UserAuthenticationService } from '../../authentication';
import { BaseComponent } from '../../shared/components/base/base.component';

@Component({
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'
})
export class LoginComponent extends BaseComponent {
  public model: LoginData = new LoginData();

  private subscription: Subscription;

  constructor(
    private userAuthService: UserAuthenticationService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  public onInit() {
    this.subscription = this.userAuthService.userChanged.subscribe(user => (user ? this.router.navigate(['/']) : null));
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  login() {
    this.startLoading();
    this.authService.login(this.model).then(() => this.router.navigate(['/']), () => this.stopLoading());
  }
}
