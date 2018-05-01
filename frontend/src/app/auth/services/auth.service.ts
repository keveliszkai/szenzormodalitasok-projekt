import { Injectable } from '@angular/core';
import { LoginData } from '../models';
import { Observable } from 'rxjs/Observable';
import { UserAuthenticationService } from '../../authentication';
import { ApiService } from '../../api';

@Injectable()
export class AuthService {
  constructor(private apiService: ApiService, private userService: UserAuthenticationService) {}

  public login(data: LoginData): Promise<boolean> {
    return this.userService.obtainAccessToken({
      username: data.email,
      password: data.password
    });
  }
}
