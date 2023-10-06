import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { UserConfigRoutes } from './user-config.routing';
import { ViewComponent } from './components/view/view.component';



@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    UserConfigRoutes,
    SharedModule
  ]
})
export class UserConfigModule { }
