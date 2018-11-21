import { Injectable } from '@angular/core';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';


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
  private fbUserDataUrl = 'http://localhost:3000/user/store-facebook-data';

  // storeLoginData(data: LoginResponse): Observable<LoginResponse> {

  //   this.auth.addToSession(data);
  //   // return this.http.post<LoginResponse>(this.fbUserDataUrl, data, httpOptions)
  //   //   .pipe(
  //   //     catchError(this.handleError)
  //   //   );
  // }

  init(): void {
    const initParams: InitParams = {
      appId: '485757901904710',
      xfbml: true,
      version: 'v3.1'
    };
    this.fb.init(initParams);
  }

  async login(loginOptions= { scope: 'ads_read,pages_show_list, read_insights',
    return_scopes: true}): Promise<any> {
    const loginResponse = await this.fb.login(loginOptions);
    const userNamesEmail = await this.fb.api(`${loginResponse.authResponse.userID}`, 'get', {fields: 'name, email'});
    this.auth.addToSession({
      userName: userNamesEmail.name,
      userEmail: userNamesEmail.email,
      fbAuthToken: loginResponse.authResponse.accessToken,
      fbUserID: loginResponse.authResponse.userID,
      fbScopes: loginResponse.authResponse.grantedScopes
    });
    return loginResponse;
  }

  logout(): void {
    this.fb.logout().then(() => console.log('Logged out!'));
  }

  // checkLoginStatus(): void {
  //   this.fb.getLoginStatus()
  //     .then(function(response) {
  //       console.log(response);
  //     });
  // }

  async getAdAccounts(): Promise<any> {
    const userData = this.auth.getSession();
    const adaccounts = await this.fb.api(`${userData['fbUserID']}/adaccounts`);
    const adaccountsData = [];
    for (const adac of adaccounts['data']) {
      const data = await this.fb.api(adac.id, 'get', {
        fields: 'id,account_id,age,account_status,business_name,balance,currency,business_city'});
      adaccountsData.push(data);
    }
    return adaccountsData;
  }

  async getCampaignsData(adacId: String): Promise<any> {
    const campaigns = await this.fb.api(`${adacId}/campaigns`);
    return campaigns.data;
  }

  async getFbPages(): Promise<any> {
    const userData = this.auth.getSession();
    const fbpages = await this.fb.api(`${userData['fbUserID']}/accounts`, 'get',
      {fields: 'name,picture,access_token'});
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
  }

  constructor(private fb: FacebookService, private http: HttpClient, private auth: AuthService) { }
}
