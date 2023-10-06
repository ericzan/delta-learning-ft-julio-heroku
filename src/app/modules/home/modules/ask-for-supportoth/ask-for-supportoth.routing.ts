import { ViewChild, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewComponent } from './components/view/view.component';
import { SupportothComponent } from './components/supportoth/supportoth.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
  },
  {
    path: 'supportoth',
    pathMatch: 'full',
    component:  SupportothComponent,
  },

];

export const SupportothCRoutes = RouterModule.forChild(routes);
