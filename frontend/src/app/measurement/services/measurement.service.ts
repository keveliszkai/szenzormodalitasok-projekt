import { Injectable } from '@angular/core';
import { ApiService } from '../../api';
import { Observable } from 'rxjs/Observable';
import { MeasurementFactory } from '../factories/measurement.factory';
import { Measurement } from '../models/measurement.model';

@Injectable()
export class MeasurementService {
  constructor(private apiService: ApiService) {}

  public getAll(routeParams: object): Observable<Measurement[]> {
    return this.apiService
      .get<any[]>(`/measurements`, routeParams)
      .map(response => response.data.map(d => MeasurementFactory.loadFromResponse(d)));
  }
}
