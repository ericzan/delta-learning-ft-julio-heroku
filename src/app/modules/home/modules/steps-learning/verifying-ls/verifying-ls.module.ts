import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { VerifyingLsRoutes } from './verifying-ls.routing';
import { ViewComponent } from './components/view/view.component';
import { CardComponent } from './components/card/card.component';



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
