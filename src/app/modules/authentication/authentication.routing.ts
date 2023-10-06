import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { RedirectGuard } from './components/sign-in/redirect-guard.guard';



const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'recovery',
    component: RecoveryComponent
  },
  {
    path: 'sing-up',
    component: SingUpComponent
  },
  {
    path: 'paymentURL',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: { externalUrl: 'xxx'    }
  }
];

export const AuthenticationRoutes = RouterModule.forChild(routes);
