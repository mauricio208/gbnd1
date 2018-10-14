import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service'


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FacebookLoginService {

  // storeLoginData(data: LoginResponse): Observable<LoginResponse> {

  //   this.auth.addToSession(data);
  //   // return this.http.post<LoginResponse>(this.fbUserDataUrl, data, httpOptions)
  //   //   .pipe(
  //   //     catchError(this.handleError)
  //   //   );
    
  // }

  init(): void {
    let initParams: InitParams = {
      appId: '485757901904710',
      xfbml: true,
      version: 'v3.1'
    };
    this.fb.init(initParams);
  }
  
  async login(loginOptions={ scope:"ads_read,pages_show_list, read_insights",
    return_scopes: true}): Promise<any> {
    let loginResponse = await this.fb.login(loginOptions)
    console.log(loginResponse)
    let userNamesEmail = await this.fb.api(`${loginResponse.authResponse.userID}`,'get',{fields: 'name, email'})
    this.auth.addToSession({
      userName:userNamesEmail.name,
      userEmail:userNamesEmail.email,
      fbAuthToken:loginResponse.authResponse.accessToken,
      fbUserID:loginResponse.authResponse.userID,
      fbScopes:loginResponse.authResponse.grantedScopes      
    })
    console.log(this.auth.getSession())
    return loginResponse
  }

  logout():void{
    this.fb.logout().then(() => console.log('Logged out!'));
  }

  checkLoginStatus(): void {
    this.fb.getLoginStatus()
      .then(function(response) {
        console.log(response)
      });
  }

  async getAdAccounts(): Promise<any>{
    let userData = this.auth.getSession();
    let adaccounts = await this.fb.api(`${userData['fbUserID']}/adaccounts`)
    let adaccountsData = [];
    for (const adac of adaccounts['data']) {
      let data = await this.fb.api(adac.id,"get",{fields:"id,account_id,age,account_status,business_name,balance,currency,business_city"})
      adaccountsData.push(data); 
    }
    return adaccountsData;
  }

  async getCampaignsData(adacId: String): Promise<any>{
    let campaigns = await this.fb.api(`${adacId}/campaigns`);
    let cpsCollectedData =[];
    for (const cp of campaigns.data) {
      let cpData = await this.fb.api(`${cp.id}`,"get",{fields:"name,objective,status,spend_cap,lifetime_budget"});
      cpsCollectedData.push(cpData);
    }
    return cpsCollectedData;
  }

  async getFbPages(): Promise<any>{
    let userData = this.auth.getSession();
    let fbpages = await this.fb.api(`${userData['fbUserID']}/accounts`,"get",{fields:"name,picture,access_token"});
    
    console.log('fb pages:',fbpages);
    return fbpages;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  private fbUserDataUrl = 'http://localhost:3000/user/store-facebook-data';

  constructor(private fb: FacebookService, private http:HttpClient, private auth:AuthService) { }
}
