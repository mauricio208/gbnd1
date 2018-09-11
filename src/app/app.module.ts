import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FacebookModule } from 'ngx-facebook';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FacebookLoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FacebookModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
