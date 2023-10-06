import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyingLsRoutes } from './verifying-ls.routing';
import { SharedModule } from '@shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { ViewComponent } from './components/view/view.component';



@NgModule({
  declarations: [
    ViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VerifyingLsRoutes
  ]
})
export class VerifyingLsModule { }
