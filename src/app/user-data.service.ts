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
    return await this.http.get(`${environment.apiUrl}/intdata/users`, httpopt).toPromise();
  }

  async getSatistics(cpId): Promise<any> {
    const httpopt = {
      ...httpOptions,
      params: {
        cpId: String(cpId),
      }
    };
    return await this.http.get(`${environment.apiUrl}/intdata/campaign`, httpopt).toPromise();
  }

  constructor(private http: HttpClient) { }
}
