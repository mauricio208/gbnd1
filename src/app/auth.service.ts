import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

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
  private loginUrl = `${environment.apiUrl}/user/login`;

  getSession(): object {
    return this.userSession;
  }

  getAuthorizationToken(): string {
    if (this.userSession) {
      return this.userSession.jwt;
    }
    return undefined;
  }

  addToSession(data: object): void {
     this.userSession = {...this.userSession, ...data};
  }

  async login(credentials: object): Promise<any> {
    try {
      const loginData = await this.http.post(this.loginUrl,  JSON.stringify(credentials), httpOptions).toPromise();
      this.addToSession(loginData);
    } catch (error) {
      throw error;
    }
  }

  constructor(private http: HttpClient) { }
}
