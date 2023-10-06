import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengImportsModule } from './imports/primeng-imports/primeng-imports.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';
import { LevelStepPipe } from './pipe/level-step.pipe';
import { TranslateI18Module } from '../translate-i18n.module';
import { TranslateModule } from '@ngx-translate/core';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';



@NgModule({
  declarations: [
    LoadingComponent,
    LevelStepPipe,
    DialogErrorComponent
  ],
  imports: [
    CommonModule,
    PrimengImportsModule,
    TranslateModule,
  ],
  exports: [
    PrimengImportsModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingComponent,
    DialogErrorComponent,
    LevelStepPipe,
    TranslateModule
  ]
})
export class SharedModule { }
