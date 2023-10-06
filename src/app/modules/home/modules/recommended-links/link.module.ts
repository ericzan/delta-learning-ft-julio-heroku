
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { LikeRoutes } from './link.routing';
import { DataViewLayoutOptions, DataViewModule } from 'primeng/dataview';
import { ViewComponent } from './components/view/view.component';
import { RecommendedLinksComponent } from './components/list-links/recommended-links.component';
import { SpinnerComponent } from './components/ui/spinner/spinner.component';
import { AlertComponent } from './components/ui/alert/alert.component';
import { SharedModule } from '@shared/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ViewComponent,
    RecommendedLinksComponent,
    AlertComponent,
    SpinnerComponent


  ],
  imports: [ DataViewModule,
    LikeRoutes,
    CommonModule,
    SharedModule,
    CheckboxModule,
    InputNumberModule,
    CardModule,
    PanelModule,
    TableModule,
    SelectButtonModule,
    DragDropModule ,
    DialogModule,
    SharedModule

  ],
  exports: [],

  providers: [],
})
export class LinkModule { }
