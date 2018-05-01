import { MeasurementUnit } from './measurement-unit.enum';
import { MeasurementType } from './measurement-type.enum';

export class Measurement {
  public id: number;
  public value: number;
  public unit: MeasurementUnit;
  public type: MeasurementType;
  public date: Date;
}
