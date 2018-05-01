import { NgModule } from '@angular/core';
import { NavigationService } from './services/navigation.service';
import { HorizontalNavigationComponent } from './horizontal/horizontal-navigation.component';
import { SharedModule } from '../shared';
import { VerticalNavigationComponent } from './vertical/vertial-navigation.component';

@NgModule({
  declarations: [HorizontalNavigationComponent, VerticalNavigationComponent],
  imports: [SharedModule],
  exports: [HorizontalNavigationComponent, VerticalNavigationComponent],
  providers: [NavigationService]
})
export class NavigationModule {}
