import { ViewChild, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewComponent } from './components/view/view.component';
import { RecommendedLinksComponent } from './components/list-links/recommended-links.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent,
  },
  {
    path: 'links',
    pathMatch: 'full',
    component: RecommendedLinksComponent,
  },

];

export const LikeRoutes = RouterModule.forChild(routes);
