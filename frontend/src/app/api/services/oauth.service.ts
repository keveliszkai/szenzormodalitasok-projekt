import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class OauthService {
  /**
   * Stored apiUrl, that comes from the parent module.
   */
  private apiUrl: string;

  /**
   * Name of the cookie, that stores the Access Token.
   */
  private accessTokenCookieName = 'access_token';

  /**
   * Name of the cookie, that stores the Refresh Token.
   */
  private refreshTokenCookieName = 'refresh_token';

  /**
   * Name of the cookie, that stores the Expires In variable.
   */
  private expirationInCookieName = 'expires_in';

  /**
   * This event fires, when the Expires In variable nearly expired.
   */
  public nearlyExpired: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private http: Http) {}

  /**
   * This function returns the stored Access Token.
   */
  public getToken(): string {
    const accessToken = Cookie.get(this.accessTokenCookieName);
    const expiresIn = +Cookie.get(this.expirationInCookieName);

    if (expiresIn < 30) {
      this.nearlyExpired.emit(Cookie.get(this.refreshTokenCookieName));
    } else {
      setTimeout(() => {
        this.nearlyExpired.emit(Cookie.get(this.refreshTokenCookieName));
      }, (expiresIn - 30) * 1000);
    }

    return accessToken;
  }

  /**
   * This function stores the given token to the CookieStore.
   * @param token The token that came from the API.
   */
  public setToken(token: { access_token: string; refresh_token: string; expires_in: string }): void {
    const expireDate = new Date().getTime() + 1000 * +token.expires_in;
    Cookie.set(this.accessTokenCookieName, token.access_token, expireDate);
    Cookie.set(this.refreshTokenCookieName, token.refresh_token, expireDate);
    Cookie.set(this.expirationInCookieName, token.expires_in, expireDate);
  }

  /**
   * This function returns `true` if there is any Access Token in the browser's CookieStore.
   */
  public hasToken(): boolean {
    return Cookie.check(this.accessTokenCookieName);
  }

  /**
   * This function removes the Access Token from the browser's CookieStore.
   */
  public deleteToken(): void {
    Cookie.delete(this.accessTokenCookieName);
  }
}
