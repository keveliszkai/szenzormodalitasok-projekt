import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiModule } from './api';
import { AuthenticationModule } from './authentication';
import { FooterModule } from './footer';
import { NavigationModule } from './navigation';
import { DashboardModule } from './dashboard';
import { AuthModule } from './auth';
import { MeasurementModule } from './measurement/measurement.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApiModule,
    AuthenticationModule,
    FooterModule,
    NavigationModule,
    DashboardModule,
    AuthModule,
    MeasurementModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
