import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FbAdaccountsComponent } from './fb-adaccounts/fb-adaccounts.component';
import { FbPageComponent } from './fb-page/fb-page.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component';
import { IntDashboardComponent } from './int-dashboard/int-dashboard.component';
import { CampaignsComponent } from './int-dashboard/campaigns/campaigns.component';

const routes: Routes = [
  { path: '', redirectTo: '/fblogin', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'fblogin', component: FacebookLoginComponent },
  { path: 'fbadaccounts', component: FbAdaccountsComponent },
  { path: 'fbpage', component: FbPageComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'dashboard', component: IntDashboardComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

