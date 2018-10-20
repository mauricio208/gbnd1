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
  
  async initializeUser(data):Promise<any>{
    let response = await this.http.post(`${process.env.BACKEND_HOST}/user/init`, JSON.stringify(data), httpOptions).toPromise();
    console.log()

  }


  constructor(private http: HttpClient, private auth: AuthService) { }
  
  

}
