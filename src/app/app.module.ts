import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FacebookModule } from 'ngx-facebook';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { UiModule } from './ui/ui.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { } from '@fortawesome/free-solid-svg-icons';

library.add(faFacebook)
@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FacebookModule.forRoot(),
    FontAwesomeModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
