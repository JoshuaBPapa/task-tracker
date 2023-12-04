import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StatisticsResponse } from 'src/types/responses/statistics-response';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsResponse> {
    return this.http.get<StatisticsResponse>(`${environment.api}/tasks/statistics`);
  }
}
