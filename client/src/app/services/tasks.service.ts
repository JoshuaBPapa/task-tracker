import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatedResponse } from 'src/types/responses/created-response';

interface PostTaskData {
  title: string;
  projectId: number | null;
  assignedUserId: number | null;
  priority: number;
  status: number;
  description: string;
}

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) {}

  postTask(task: PostTaskData): Observable<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${environment.api}/tasks`, task);
  }
}
