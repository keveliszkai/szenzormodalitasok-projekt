import { Injectable } from '@angular/core';
import { ApiService } from '../../api';
import { ServerInfo } from '../models/server-info.model';
import { Observable } from 'rxjs/Observable';
import { ServerInfoFactory } from '../factories/server-info.factory';

@Injectable()
export class DashboardService {
  constructor(private apiService: ApiService) {}

  public getInfo(): Observable<ServerInfo> {
    return this.apiService.get<any>(`/server`).map(response => ServerInfoFactory.loadFromResponse(response.data));
  }
}
