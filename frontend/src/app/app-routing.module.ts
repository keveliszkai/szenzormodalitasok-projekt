import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';

import { LoginComponent } from './auth';
import { DashboardMainComponent } from './dashboard';

const appRoutes: Routes = [
  { path: '', component: DashboardMainComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
