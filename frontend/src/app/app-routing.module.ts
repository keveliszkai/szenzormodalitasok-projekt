import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';

import { LoginComponent } from './auth';
import { DashboardMainComponent } from './dashboard';
import { AuthGuard } from './authentication';
import { MeasurementListComponent } from './measurement/list/measurement-list.component';

const appRoutes: Routes = [
  { path: '', component: DashboardMainComponent, canActivate: [AuthGuard] },
  { path: 'measurement', component: MeasurementListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
