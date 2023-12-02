import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  userLogin(payload){
    return this.http.post(`${this.API_URL}/auth/login`,payload);
  }

  userRegister(payload){
    return this.http.post(`${this.API_URL}/user/register`, payload);
  }
}
