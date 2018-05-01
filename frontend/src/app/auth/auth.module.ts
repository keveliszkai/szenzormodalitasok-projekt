import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { LoginComponent } from './login/login.component';

import { AuthService } from './services/auth.service';

@NgModule({
  imports: [SharedModule],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AuthModule {}
