import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { HomeRoutes } from './home.routing';
import { MainComponent } from './components/main/main.component';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    MenuModule,
    CommonModule,
    SharedModule,
    HomeRoutes
  ]
})
export class HomeModule { }
