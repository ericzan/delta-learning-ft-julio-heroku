import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view/view.component';
import { SharedModule } from '@shared/shared.module';
import { VerifyingVwRoutes } from './verifying-vw.routing';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    ViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VerifyingVwRoutes
  ]
})
export class VerifyingVwModule { }
