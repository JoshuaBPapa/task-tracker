import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { CreatedResponse } from 'src/types/responses/created-response';
import { Project } from 'src/types/responses/project';
import { Task } from 'src/types/responses/task';

@Injectable()
export class ProjectsService {
  private projectsData = new Subject<Page<Project>>();
  projectsData$ = this.projectsData.asObservable();
  private projectTasksData = new Subject<Page<Task>>();
  projectTasksData$ = this.projectTasksData.asObservable();

  constructor(private http: HttpClient) {}

  getProjects(params: Params): Observable<Page<Project>> {
    return this.http
      .get<Page<Project>>(`${environment.api}/projects`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.projectsData.next(res)));
  }

  getProjectTasks(params: Params, id: number): Observable<Page<Task>> {
    return this.http
      .get<Page<Task>>(`${environment.api}/tasks/project/${id}`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.projectTasksData.next(res)));
  }

  postProject(project: { name: string }): Observable<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${environment.api}/projects`, project);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${environment.api}/projects/${id}`);
  }

  putProject(project: { name: string }, id: number): Observable<CreatedResponse> {
    return this.http.put<CreatedResponse>(`${environment.api}/projects/${id}`, project);
  }

  deleteProject(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.api}/projects/${id}`);
  }
}
