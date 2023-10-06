import { ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent
  },
];

export const NewLearningRoutes = RouterModule.forChild(routes);
