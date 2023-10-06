import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './components/view/view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    component: ViewComponent,
    children: [
      {
        path: 'learning',
        loadChildren: ()=> import('./learning/learning.module').then( mod => mod.LearningModule)
      },
      {
        path: 'verifying-vw',
        loadChildren: ()=> import('./verifying-vw/verifying-vw.module').then( mod => mod.VerifyingVwModule)
      },
      {
        path: 'verifying-ce',
        loadChildren: ()=> import('./verifying-ce/verifying-ce.module').then( mod => mod.VerifyingCeModule)
      },
      {
        path: 'verifying-ls',
        loadChildren: ()=> import('./verifying-ls/verifying-ls.module').then( mod => mod.VerifyingLsModule)
      },
      {
        path: 'validating',
        loadChildren: ()=> import('./validating/validating.module').then( mod => mod.ValidatingModule)
      },
      {
        path: 'ls-ls',
        loadChildren: ()=> import('./ls-ls/ls-ls.module').then( mod => mod.LsLsModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'learning'
      }
    ]
  },
];

export const StepsLearningRoutes = RouterModule.forChild(routes);
