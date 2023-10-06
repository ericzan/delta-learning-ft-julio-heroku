import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ProgressRoutes } from './progress.routing';
import { ViewComponent } from './components/view/view.component';



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProgressRoutes
  ]
})
export class ProgressModule { }
