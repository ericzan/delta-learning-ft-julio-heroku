import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view/view.component';
import { CardComponent } from './components/card/card.component';
import { SharedModule } from '@shared/shared.module';
import { VerifyingCeRoutes } from './verifying-ce.routing';



@NgModule({
  declarations: [
    ViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VerifyingCeRoutes
  ]
})
export class VerifyingCeModule { }
