import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { AuthenticationUser, UserAuthenticationService } from '../../authentication';

@Component({
  selector: 'horizontal-navigation-component',
  templateUrl: 'horizontal-navigation.component.html'
})
export class HorizontalNavigationComponent implements OnInit, OnDestroy {
  public user: AuthenticationUser = null;

  public selectedLanguage: string;

  constructor(
    private router: Router,
    private _service: UserAuthenticationService,
    private navService: NavigationService
  ) {}

  ngOnInit() {
    this._service.userChanged.subscribe((user: AuthenticationUser) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this._service.userChanged.unsubscribe();
  }

  public navigate() {
    if (this.user) {
      this.router.navigate(['/user', this.user.id]);
    } else {
      this.router.navigate(['/user']);
    }
  }

  logout() {
    this._service.purgeAuth();
  }

  public toggle() {
    this.navService.toggleNav.emit(true);
  }
}
