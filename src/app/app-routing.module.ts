import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FbAdaccountsComponent } from './fb-adaccounts/fb-adaccounts.component' 
const routes: Routes = [
  { path: '', redirectTo: '/fblogin', pathMatch: 'full' },
  { path: 'fblogin', component: FacebookLoginComponent },
  { path: 'fbadaccounts', component: FbAdaccountsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

