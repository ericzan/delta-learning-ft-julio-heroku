import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ViewComponent
  },
];

export const VerifyingCeRoutes = RouterModule.forChild(routes);
