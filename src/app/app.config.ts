import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AuthComponent } from './auth/auth';
import { DashboardComponent } from './dashboard/dashboard';
import { BillsComponent } from './bills/bills';
import { UsageComponent } from './usage/usage';
import { ProfileComponent } from './profile/profile';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // default
  { path: 'login', component: AuthComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'usage', component: UsageComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: 'login' }
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()  
  ]
};