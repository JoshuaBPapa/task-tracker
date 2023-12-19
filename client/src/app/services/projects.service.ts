import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { CreatedResponse } from 'src/types/responses/created-response';
import { Projects } from 'src/types/responses/projects';

@Injectable()
export class ProjectsService {
  private projectsData = new Subject<Page<Projects>>();
  projectsData$ = this.projectsData.asObservable();

  constructor(private http: HttpClient) {}

  getProjects(params: Params): Observable<Page<Projects>> {
    return this.http
      .get<Page<Projects>>(`${environment.api}/projects`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.projectsData.next(res)));
  }

  postProject(project: { name: string }) {
    return this.http.post<CreatedResponse>(`${environment.api}/projects`, project);
  }
}
