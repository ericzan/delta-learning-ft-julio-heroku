import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PackageRoutes } from './package.routing';
import { ViewComponent } from './components/view/view.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { ActiveComponent } from './components/active/active.component';
import { EditLabelComponent } from './components/active/edit-label/edit-label.component';



@NgModule({
  declarations: [
    ViewComponent,
    ArchiveComponent,
    ActiveComponent,
    EditLabelComponent
  ],
  imports: [
    CommonModule,
    PackageRoutes,
    SharedModule
  ]
})
export class PackageModule { }
