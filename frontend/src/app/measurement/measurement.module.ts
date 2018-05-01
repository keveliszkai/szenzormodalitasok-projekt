import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementListComponent } from './list/measurement-list.component';
import { SharedModule } from '../shared';
import { MeasurementService } from './services/measurement.service';

@NgModule({
  declarations: [MeasurementListComponent],
  imports: [CommonModule, SharedModule],
  exports: [],
  providers: [MeasurementService]
})
export class MeasurementModule {}
