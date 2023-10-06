import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view/view.component';
import { CardComponent } from './components/card/card.component';
import { ValidatingRoutes } from './validating.routing';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ValidatingRoutes
  ]
})
export class ValidatingModule { }
