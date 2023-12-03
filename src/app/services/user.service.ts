import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  findUserInformationById(id: any){
    return this.http.get(`${this.API_URL}/user/{id}`.replace('{id}', id));
  }
}
