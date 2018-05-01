import { Component } from '@angular/core';
import { AuthenticationUser, UserAuthenticationService } from './authentication';
import { BaseComponent } from './shared/components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  title = 'app';

  public user: AuthenticationUser;

  constructor(private userService: UserAuthenticationService) {
    super();
    this.userService.checkAuth();
    this.destroyableSubscriptions.push(this.userService.userChanged.subscribe(user => (this.user = user)));
  }
}
