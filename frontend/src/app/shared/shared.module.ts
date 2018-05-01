import { NgModule } from '@angular/core';
import { DependencyModule } from './dependency.module';
import { environment } from '../../environments/environment';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoaderComponent],
  imports: [DependencyModule, RouterModule, FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule],
  exports: [
    DependencyModule,
    LoaderComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: []
})
export class SharedModule {}
