import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  async getUsers(nPerPage= 10, actualPage= 0): Promise<any> {
    const httpopt = {
      ...httpOptions,
      params: {
        nPerPage: String(nPerPage),
        actualPage: String(actualPage)
      }
    };
    console.log(httpopt);
    return await this.http.get(`${environment.apiUrl}/intdata/users`, httpopt).toPromise();
  }

  async getGbndCampaigns(userFbId): Promise<any> {
    await this.http.get(`/int/${userFbId}`);
  }

  constructor(private http: HttpClient) { }
}
