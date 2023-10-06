import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'ask-for-supportoth',
        loadChildren: ()=> import('./modules/ask-for-supportoth/ask-for-supportoth.module').then( mod => mod.AskForSupportothModule)
      },
      {
        path: 'recommended-links',
        loadChildren: () => import('./modules/recommended-links/link.module').then(mod => mod.LinkModule)
      },
      {
        path: 'games',
        loadChildren: () => import('./modules/games/game.module').then(mod => mod.GameModule)
      },
      {
        path: 'level',
        loadChildren: () => import('./modules/level/level.module').then(mod => mod.LevelModule)
      },
      {
        path: 'new-learning',
        loadChildren: () => import('./modules/new-learning/new-learning.module').then(mod => mod.NewLearningModule)
      },
      {
        path: 'progress',
        loadChildren: () => import('./modules/progress/progress.module').then(mod => mod.ProgressModule)
      },
      {
        path: 'package/:id',
        loadChildren: () => import('./modules/package/package.module').then(mod => mod.PackageModule)
      },
      {
        path: 'steps/:idSubCat/:id/:position',
        loadChildren: () => import('./modules/steps-learning/steps-learning.module').then(mod => mod.StepsLearningModule)
      },
      {
        path: 'user-configuration',
        loadChildren: () => import('./modules/user-config/user-config.module').then(mod => mod.UserConfigModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'progress'
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'main'
  }
];

export const HomeRoutes = RouterModule.forChild(routes);
