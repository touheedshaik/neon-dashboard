import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { DashboardComponent } from './dashboard/dashboard';
import { ProfileComponent } from './profile/profile';
import { BillsComponent } from './bills/bills';
import { UsageComponent } from './usage/usage';
import { LayoutComponent } from './layout/layout';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';

export const routes: Routes = [

  { path: '', component: AuthComponent },

  { path: 'forgot-password', component: ForgotPasswordComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'bills', component: BillsComponent },
      { path: 'usage', component: UsageComponent }
    ]
  },

  { path: '**', redirectTo: '' }

];