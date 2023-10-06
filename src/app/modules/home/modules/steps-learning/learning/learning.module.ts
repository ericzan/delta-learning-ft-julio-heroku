import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view/view.component';
import { SharedModule } from '@shared/shared.module';
import { LearningRoutes } from './learning.routing';



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    LearningRoutes,
    SharedModule
  ]
})
export class LearningModule { }
