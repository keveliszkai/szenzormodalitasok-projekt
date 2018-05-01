import { NgModule } from '@angular/core';
import { ApiService } from './services/api.service';
import { OauthService } from './services/oauth.service';

@NgModule({
  imports: [],
  providers: [ApiService, OauthService]
})
export class ApiModule {}
