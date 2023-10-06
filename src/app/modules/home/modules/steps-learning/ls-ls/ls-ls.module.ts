import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { LsLsRoutes } from './ls-ls.routing';
import { ViewComponent } from './components/view/view.component';
import { CardComponent } from './components/card/card.component';



@NgModule({
  declarations: [
    ViewComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    LsLsRoutes,
    SharedModule
  ]
})
export class LsLsModule { }
