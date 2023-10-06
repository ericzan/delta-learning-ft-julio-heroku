import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LevelRoutes } from './level.routing';
import { EnglishEvaluationComponent } from './components/english-evaluation/english-evaluation.component';
import { ViewComponent } from './components/view/view.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { DialogModule } from 'primeng/dialog';
import { AlertComponent } from './components/ui/alert/alert.component';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    ViewComponent,
    SpinnerComponent,
    EnglishEvaluationComponent,
    AlertComponent,


  ],
  imports: [
    CommonModule,
    LevelRoutes,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    SharedModule,
    DialogModule,
    CardModule

  ],
  exports: [],

  providers: [],
})
export class LevelModule { }
