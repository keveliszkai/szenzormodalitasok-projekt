import { Component, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { DashboardService } from '../services/dashboard.service';
import { ServerInfo } from '../models/server-info.model';
import { MeasurementService } from '../../measurement/services/measurement.service';
import { Measurement } from '../../measurement/models/measurement.model';
import { MeasurementType } from '../../measurement/models/measurement-type.enum';
import Dygraph from 'dygraphs';

@Component({
  templateUrl: 'dashboard-main.component.html'
})
export class DashboardMainComponent extends BaseComponent {
  public model: ServerInfo;
  public measurement: Measurement[];

  @ViewChild('graph') graph: ElementRef;
  @ViewChild('graph2') graph2: ElementRef;

  constructor(private service: DashboardService, private measurementService: MeasurementService) {
    super();
  }

  public onInit() {
    this.startLoading();

    this.service.getInfo().subscribe(data => {
      this.model = data;
      this.stopLoading();
    });

    this.measurementService.getAll({ from: '2018-05-07 12:00:00', to: '2018-05-08 12:00:00' }).subscribe(data => {
      this.measurement = data;
      const datas = [];
      this.measurement.forEach(i => {
        const sound = data.find(s => s.date == i.date && s.type == MeasurementType.sound);
        const movement = data.find(s => s.date == i.date && s.type == MeasurementType.movement);
        datas.push([i.date, movement ? +movement.value * 100 : 0, sound ? sound.value : 0]);
      });

      const g = new Dygraph(
        // containing div
        this.graph.nativeElement,
        datas,
        {
          labels: ['Date', 'Movement', 'Sound']
        }
      );
    });

    this.measurementService.getAll({ from: '2018-05-08 12:00:00', to: '2018-05-09 12:00:00' }).subscribe(data => {
      this.measurement = data;
      const datas = [];
      this.measurement.forEach(i => {
        const sound = data.find(s => s.date == i.date && s.type == MeasurementType.sound);
        const movement = data.find(s => s.date == i.date && s.type == MeasurementType.movement);
        datas.push([i.date, movement ? +movement.value * 100 : 0, sound ? sound.value : 0]);
      });

      const g = new Dygraph(
        // containing div
        this.graph2.nativeElement,
        datas,
        {
          labels: ['Date', 'Movement', 'Sound']
        }
      );
    });
  }
}
