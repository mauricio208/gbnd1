import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private userSession;

  getSession(): object {
    return this.userSession;
  }

  addToSession(data: object): void {
     this.userSession = {...this.userSession, ...data};
  }

  async login(credentials: object): Promise<any> {
    try {
      const loginData = await this.http.post(`/user/login`, JSON.stringify(credentials), httpOptions).toPromise();
      this.addToSession(loginData);
    } catch (error) {
      return error;
    }
  }

  constructor(private http: HttpClient) { }
}
