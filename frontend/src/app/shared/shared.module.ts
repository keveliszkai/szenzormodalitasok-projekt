import { NgModule } from '@angular/core';
import { DependencyModule } from './dependency.module';
import { environment } from '../../environments/environment';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [LoaderComponent],
  imports: [DependencyModule, RouterModule, FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, CommonModule, ChartsModule],
  exports: [
    DependencyModule,
    LoaderComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    CommonModule,
    ChartsModule
  ],
  providers: []
})
export class SharedModule {}
