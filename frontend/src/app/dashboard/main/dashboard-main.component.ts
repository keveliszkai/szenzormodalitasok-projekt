import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/components/base/base.component';
import { DashboardService } from '../services/dashboard.service';
import { ServerInfo } from '../models/server-info.model';

@Component({
  templateUrl: 'dashboard-main.component.html'
})
export class DashboardMainComponent extends BaseComponent {
  public model: ServerInfo;

  constructor(private service: DashboardService) {
    super();
  }

  public onInit() {
    this.startLoading();
    this.service.getInfo().subscribe(data => {
      this.model = data;
      this.stopLoading();
    });
  }
}
