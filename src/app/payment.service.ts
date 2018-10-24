import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  async initializeUser(data): Promise<any> {
    const response = await this.http.post(`/user/init`, JSON.stringify(data), httpOptions).toPromise();
    return response;

  }


  constructor(private http: HttpClient, private auth: AuthService) { }

}
