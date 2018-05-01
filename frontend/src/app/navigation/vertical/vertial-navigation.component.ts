import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../authentication';

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertial-navigation.component.html'
})
export class VerticalNavigationComponent implements OnInit {
  constructor(public service: UserAuthenticationService) {}

  logout() {
    this.service.purgeAuth();
  }

  ngOnInit(): void {}
}
