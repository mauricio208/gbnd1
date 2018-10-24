import { Injectable } from '@angular/core';

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

  constructor() { }
}
