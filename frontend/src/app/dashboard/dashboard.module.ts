import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { DashboardMainComponent } from './main/dashboard-main.component';

@NgModule({
  declarations: [DashboardMainComponent],
  imports: [SharedModule]
})
export class DashboardModule {}
