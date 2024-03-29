import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) {}

  deleteTeam(): Observable<null> {
    return this.http.delete<null>(`${environment.api}/teams`);
  }
}
