import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/view/view.component';
import { SupportothComponent } from './components/supportoth/supportoth.component';
import { SupportothCRoutes } from './ask-for-supportoth.routing';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AlertComponent } from './components/ui/alert/alert.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';




@NgModule({
  declarations: [
    ViewComponent,
    SupportothComponent,
    AlertComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    SupportothCRoutes,
    DropdownModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    SharedModule
  ]
})
export class AskForSupportothModule {



 }
