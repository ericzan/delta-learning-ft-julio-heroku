import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthenticationRoutes } from './authentication.routing';
import { SharedModule } from '@shared/shared.module';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';
import { RedirectGuard } from './components/sign-in/redirect-guard.guard';





@NgModule({
  declarations: [
    SignInComponent,
    RecoveryComponent,
    SingUpComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutes,
  ],
  providers: [RedirectGuard],
})
export class AuthenticationModule { }
