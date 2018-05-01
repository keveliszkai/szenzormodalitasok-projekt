import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthenticationService } from './services/user-authentication.service';
import { AuthGuard } from './services/auth-guard.service';

@NgModule({
  providers: [UserAuthenticationService, AuthGuard]
})
export class AuthenticationModule {}
