import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  API_URL = environment.API_URL;
  CEP_URL = environment.CEP_URL;

  constructor(private http: HttpClient) {}

  findAddress(cep){
    return this.http.get(this.CEP_URL.replace('{CEP}', cep));
  }
}
