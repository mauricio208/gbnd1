import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  async sendPaymentData(data):Promise<any>{
    // this.auth.userId  add this to data sended
    //  await this.http.post('http://localhost:3000/user/charge-payment', JSON.stringify(data))       
    console.log(data);
  }


  constructor(private http: HttpClient, private auth: AuthService) { }
  
  

}
