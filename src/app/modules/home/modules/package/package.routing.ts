import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { ActiveComponent } from './components/active/active.component';
import { ArchiveComponent } from './components/archive/archive.component';

const routes: Routes = [
  {
    path: 'package',
    component: ViewComponent,
    children: [
      {
        path: 'assets',
        component: ActiveComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'assets',
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'package',
  }
];

export const PackageRoutes = RouterModule.forChild(routes);
