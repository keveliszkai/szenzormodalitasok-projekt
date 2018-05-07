import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Headers, Http, Response, URLSearchParams, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { OauthService } from './oauth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {
  /**
   * Stored apiUrl, that comes from the parent module.
   */
  private apiUrl: string;

  constructor(private http: HttpClient, private oauthService: OauthService) {
    this.apiUrl = environment.apiUrl;
  }

  /**
   * This function returns the correct headers, that needs for the backend.
   * @param isForm Declares if the content is application/form-data.
   * @returns HttpHeaders
   */
  private setHeaders(isForm = false): HttpHeaders {
    const headersConfig = {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': this.apiUrl
    };

    if (isForm) {
      delete headersConfig['Content-type'];
    }

    if (this.oauthService.hasToken()) {
      headersConfig['Authorization'] = `Bearer ${this.oauthService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  /**
   * Interface for other components to get the Headers (Auth token, etc.).
   * @returns HttpHeaders
   */
  public getHeaders(): HttpHeaders {
    return this.setHeaders();
  }

  /**
   * GET request, that expects ListObject<T> response. It is the response, that came from the backend response transformer. This response can be used by the core's ListComponent<T>. This function handles the BaseResponse's notifications and meta properties.
   * @param path The relative path to the backend endpoint.
   * @param params The query params, that goes with the request.
   * @example getList<MyObject>('/api/some/route', { search: 'some string' });
   */
  public get<T>(path: string, params: object = {}): Observable<{ data: T }> {
    return this.http.get<{ data: T }>(`${this.apiUrl}${path}`, {
      headers: this.setHeaders(),
      params: this.objectToParams(params)
    });
  }

  /**
   * PUT request, the most common update method. This can be used as the update method of the core's EditComponent<T>. This function handles the BaseResponse's notifications and meta properties.
   * @param path The relative path to the backend endpoint.
   * @param body The object, that is the information for the backend.
   * @example put<MyObject>('/api/some/route', { newName: 'some string' });
   */
  public put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, body, {
      headers: this.setHeaders()
    });
  }

  /**
   * POST request, the most common create method. This can be used as the create method of the core's CreateComponent<T>. This function handles the BaseResponse's notifications and meta properties.
   * @param path The relative path to the backend endpoint.
   * @param body The object, that is the information for the backend.
   * @example post<MyObject>('/api/some/route', { newName: 'some string' });
   */
  public post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, body, {
      headers: this.setHeaders()
    });
  }

  /**
   * SubFunction of the objectToParams().
   * @param ob The input object.
   * @param postOrPut POST or PUT request. Boolean variable (optional).
   */
  private flattenObject(ob, postOrPut = false) {
    const toReturn = {};

    for (const i in ob) {
      if (!ob.hasOwnProperty(i)) {
        continue;
      }

      if (typeof ob[i] === 'object') {
        const flatObject = this.flattenObject(ob[i], postOrPut);
        for (const x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) {
            continue;
          }

          if (postOrPut) {
            toReturn[i + '.' + x] = flatObject[x];
          } else {
            toReturn[i + '[' + x + ']'] = flatObject[x];
          }
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }

  /**
   * This function can transform the deep objects to linear query. For example it does from `data.firstLevel.second` property to `data[firstLevel][second]`. It can be used in the get query strings.
   * @param input The input object. Can be any type of object.
   * @param postOrPut POST or PUT request. Boolean variable (optional).
   */
  private objectToParams(input: Object, postOrPut = false): HttpParams {
    let params = new HttpParams();

    const newObject = this.flattenObject(input, postOrPut);

    for (const key in newObject) {
      if (newObject.hasOwnProperty(key) && newObject[key]) {
        params = params.set(key, newObject[key]);
      }
    }

    return params;
  }
}
