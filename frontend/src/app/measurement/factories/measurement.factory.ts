import { FactoryBase } from '../../shared/factory.base';
import { Measurement } from '../models/measurement.model';

export class MeasurementFactory extends FactoryBase {
  public static loadFromResponse(response: any): Measurement {
    const result: Measurement = Object.assign(new Measurement(), this.getCamelizedObject(response, ['date']));
    result.date = new Date(response.date);
    return result;
  }
}
