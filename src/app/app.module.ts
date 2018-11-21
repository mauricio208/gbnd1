import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FacebookModule } from 'ngx-facebook';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { UiModule } from './ui/ui.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FbAdaccountsComponent } from './fb-adaccounts/fb-adaccounts.component';
import { AppRoutingModule } from './app-routing.module';
import { FbPageComponent } from './fb-page/fb-page.component';
import { PaymentComponent } from './payment/payment.component';
import { IntDashboardComponent } from './int-dashboard/int-dashboard.component';
import { CreateExpertUserComponent } from './create-expert-user/create-expert-user.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './http-interceptor/index';
import { CampaignsComponent } from './int-dashboard/campaigns/campaigns.component';
import { CpChartsComponent } from './cp-charts/cp-charts.component';


library.add(faFacebook, faCircleNotch);
@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginComponent,
    FbAdaccountsComponent,
    FbPageComponent,
    PaymentComponent,
    CampaignsComponent,
    IntDashboardComponent,
    CreateExpertUserComponent,
    LoginComponent,
    CpChartsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    FontAwesomeModule,
    UiModule,
    NgxChartsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
