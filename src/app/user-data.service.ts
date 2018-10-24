import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  async getGbndCampaigns(userFbId): Promise<any> {
    await this.http.get(`/int/${userFbId}`);
  }

  constructor(private http: HttpClient) { }
}
