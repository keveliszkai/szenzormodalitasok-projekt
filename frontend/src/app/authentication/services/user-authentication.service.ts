import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService, OauthService } from '../../api';
import { AuthenticationUser } from '../models/authentication-user.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserAuthenticationService {
  public currentUser: AuthenticationUser | null;

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  public userChanged: EventEmitter<AuthenticationUser> = new EventEmitter<AuthenticationUser>();

  constructor(
    private oauthService: OauthService,
    private apiService: ApiService,
    private location: Location,
    private router: Router,
    private http: Http
  ) {
    this.oauthService.nearlyExpired.subscribe(token => {
      this.refreshAccessToken(token);
    });
  }

  registrateUser(user: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('name', user.username);
      params.append('email', user.email);
      params.append('password', user.password);
      params.append('password_confirmation', user.passwordConfirmation);

      const headers = new Headers({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('fooClientIdPassword:secret')
      });

      const options = new RequestOptions({ headers: headers });

      return this.http
        .post(environment.apiUrl + '/admin/register', params.toString(), options)
        .map(res => res.json())
        .subscribe(
          data => {
            this.oauthService.setToken(data);
            this.checkAuth().then(() => resolve(), () => reject());
          },
          err => reject()
        );
    });
  }

  // This runs once on application startup.
  checkAuth(navigation = true): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.oauthService.hasToken()) {
        this.apiService
          .get('/users/me')
          // .map(i => AuthenticationUser.loadFromResponse(i))
          .subscribe(
            (data: AuthenticationUser) => {
              this.setAuth(data);
              resolve(true);
            },
            err => {
              this.purgeAuth(navigation);
              reject(false);
            }
          );
      } else {
        this.purgeAuth(navigation);
        resolve(false);
      }
    });
  }

  public obtainAccessToken(loginData: { username: string; password: string }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('username', loginData.username);
      params.append('password', loginData.password);
      params.append('grant_type', 'password');
      params.append('client_id', environment.clientId);
      params.append('client_secret', environment.clientSecret);

      const headers = new Headers({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('fooClientIdPassword:secret')
      });

      const options = new RequestOptions({ headers: headers });

      return this.http
        .post(environment.apiUrl + '/oauth/access_token', params.toString(), options)
        .map(res => res.json())
        .subscribe(
          data => {
            this.oauthService.setToken(data);
            this.checkAuth().then(() => resolve(), () => reject());
          },
          err => reject()
        );
    });
  }

  public refreshAccessToken(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.append('refresh_token', token);
      params.append('grant_type', 'refresh_token');
      params.append('client_id', environment.clientId);
      params.append('client_secret', environment.clientSecret);

      const headers = new Headers({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        Authorization: 'Basic ' + btoa('fooClientIdPassword:secret')
      });

      const options = new RequestOptions({ headers: headers });

      return this.http
        .post(environment.apiUrl + '/oauth/token', params.toString(), options)
        .map(res => res.json())
        .subscribe(
          data => {
            this.oauthService.setToken(data);
            this.checkAuth().then(() => resolve(), () => reject());
          },
          err => reject()
        );
    });
  }

  setAuth(user: AuthenticationUser) {
    this.isAuthenticatedSubject.next(true);
    this.currentUser = user;
    this.userChanged.emit(user);
  }

  public purgeAuth(navigation = true) {
    this.currentUser = null;
    this.userChanged.emit(null);
    this.isAuthenticatedSubject.next(false);

    this.oauthService.deleteToken();

    if (navigation) {
      this.router.navigate(['/login']);
    }
  }

  // Simple Service
  public getUser(): Observable<AuthenticationUser> {
    return new Observable<AuthenticationUser>(observer => {
      if (this.oauthService.hasToken()) {
        this.apiService.get('/users/me').subscribe(
          data => {
            observer.next(data);
          },
          err => observer.error(null)
        );
      } else {
        observer.error(null);
      }
    });
  }
}
