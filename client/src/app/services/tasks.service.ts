import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterDropdownConfig } from 'src/types/filter-dropdown-config/filter-dropdown-config';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { CreatedResponse } from 'src/types/responses/created-response';
import { Task, TaskDetailed } from 'src/types/responses/task';
import { TaskStatusPipe } from '../shared/pipes/task-status.pipe';
import { TaskPriorityPipe } from '../shared/pipes/task-priority.pipe';

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
  private tasksData = new Subject<Page<Task>>();
  tasksData$ = this.tasksData.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(params: Params): Observable<Page<Task>> {
    return this.http
      .get<Page<Task>>(`${environment.api}/tasks`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.tasksData.next(res)));
  }

  getTask(id: string): Observable<TaskDetailed> {
    return this.http.get<TaskDetailed>(`${environment.api}/tasks/task/${id}`);
  }

  postTask(task: PostTaskData): Observable<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${environment.api}/tasks`, task);
  }

  putTask(task: PostTaskData, id: number): Observable<CreatedResponse> {
    return this.http.put<CreatedResponse>(`${environment.api}/tasks/${id}`, task);
  }

  deleteTask(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.api}/tasks/${id}`);
  }

  createTaskFilters(): FilterDropdownConfig[] {
    const taskStatusPipe = new TaskStatusPipe();
    const taskPriorityPipe = new TaskPriorityPipe();

    const statusFilters: FilterDropdownConfig = {
      filterName: 'Status',
      filterKey: 'status',
      options: [],
    };
    const priorityFilters: FilterDropdownConfig = {
      filterName: 'Priority',
      filterKey: 'priority',
      options: [],
    };

    for (let i = 1; i <= 4; i++) {
      statusFilters.options.push({ key: i, label: taskStatusPipe.transform(i, 'text') });
      priorityFilters.options.push({ key: i, label: taskPriorityPipe.transform(i, 'text') });
    }

    return [statusFilters, priorityFilters];
  }
}
