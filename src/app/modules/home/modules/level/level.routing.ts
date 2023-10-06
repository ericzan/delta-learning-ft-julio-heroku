import { ViewChild, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnglishEvaluationComponent } from './components/english-evaluation/english-evaluation.component';
import { ViewComponent } from './components/view/view.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
  },
  {
    path: 'english',
    pathMatch: 'full',
    component: EnglishEvaluationComponent,
  },

];

export const LevelRoutes = RouterModule.forChild(routes);
