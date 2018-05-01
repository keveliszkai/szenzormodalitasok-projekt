import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { DashboardMainComponent } from './main/dashboard-main.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [DashboardMainComponent],
  imports: [SharedModule],
  providers: [DashboardService]
})
export class DashboardModule {}
