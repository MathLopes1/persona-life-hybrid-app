import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  API_URL = environment.API_URL;
  constructor(private http: HttpClient) {}

  createSchedules(payload: any){
    return this.http.post(`${this.API_URL}/schedules`, payload);
  }

  findAllSchedulesByInternalId(internalId: any){
    return this.http.get(`${this.API_URL}/schedules/{internalId}`.replace('{internalId}', internalId));
  }

  deleteById(id: any){
    return this.http.delete(`${this.API_URL}/schedules/{id}`.replace('{id}', id));
  }
}
