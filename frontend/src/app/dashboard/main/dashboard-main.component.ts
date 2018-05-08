import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { DashboardService } from '../services/dashboard.service';
import { ServerInfo } from '../models/server-info.model';
import { MeasurementService } from '../../measurement/services/measurement.service';
import { Measurement } from '../../measurement/models/measurement.model';
import { MeasurementType } from '../../measurement/models/measurement-type.enum';

@Component({
  templateUrl: 'dashboard-main.component.html'
})
export class DashboardMainComponent extends BaseComponent {
  public model: ServerInfo;
  public measurement: Measurement[];

  constructor(private service: DashboardService, private measurementService: MeasurementService) {
    super();
  }

  public onInit() {
    this.startLoading();

    this.service.getInfo().subscribe(data => {
      this.model = data;
      this.stopLoading();
    });

    this.measurementService.getAll({ from: '2017-05-07 12:00:00', to: '2018-05-08 12:00:00' }).subscribe(data => {
      this.measurement = data;
      this.measurement.forEach(i => {
        const sound = data.find(s => s.date == i.date && s.type == MeasurementType.percent);
        const movement = data.find(s => s.date == i.date && s.type == MeasurementType.boolean);

        this.lineChartData[0].data.push(movement ? movement : 0);
        this.lineChartData[1].data.push(sound ? sound : 0);
        this.lineChartLabels.push(i.date.getUTCHours());
      });
    });

    this.measurementService.getAll({ from: '2018-05-08 12:00:00', to: '2018-05-09 12:00:00' }).subscribe(data => {
      this.measurement = data;
      this.measurement.forEach(i => {
        const sound = data.find(s => s.date == i.date && s.type == MeasurementType.percent);
        const movement = data.find(s => s.date == i.date && s.type == MeasurementType.boolean);

        this.lineChartData2[0].data.push(movement ? movement : 0);
        this.lineChartData2[1].data.push(sound ? sound : 0);
        this.lineChartLabels2.push(i.date.getUTCHours());
      });
    });
  }

  // CHART
  // lineChart

  public lineChartData: Array<any> = [{ data: [], label: 'Movement' }, { data: [], label: 'Sound' }];

  public lineChartData2: Array<any> = [{ data: [], label: 'Movement' }, { data: [], label: 'Sound' }];
  public lineChartLabels: Array<any> = [];
  public lineChartLabels2: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    {
      // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}
