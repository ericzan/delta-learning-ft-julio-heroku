import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view/view.component';
import { SharedModule } from '@shared/shared.module';
import { StepsLearningRoutes } from './steps-learning.routing';



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StepsLearningRoutes
  ]
})
export class StepsLearningModule { }
