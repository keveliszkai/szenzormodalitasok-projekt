import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { Measurement } from '../models/measurement.model';
import { MeasurementService } from '../services/measurement.service';

@Component({
  templateUrl: './measurement-list.component.html'
})
export class MeasurementListComponent extends BaseComponent {
  public list: Measurement[] = [];

  constructor(private service: MeasurementService) {
    super();
  }

  public onInit() {
    this.startLoading();
    this.service.getAll({}).subscribe(data => {
      this.list = data;
      this.stopLoading();
    });
  }
}
