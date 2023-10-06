import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { NewLearningRoutes } from './new-learning.routing';
import { ViewComponent } from './components/view/view.component';



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    NewLearningRoutes,
    SharedModule
  ]
})
export class NewLearningModule { }
