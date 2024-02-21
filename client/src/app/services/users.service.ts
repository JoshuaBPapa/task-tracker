import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/types/page';
import { CreatedResponse } from 'src/types/responses/created-response';
import { Task } from 'src/types/responses/task';
import { User } from 'src/types/responses/user';

interface PostUserData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  authLevel: number;
  username: string;
  password: string;
  confirmPassword: string;
}

interface PutUserData extends Omit<PostUserData, 'password' | 'confirmPassword' | 'username'> {}

interface UpdatedPasswordData {
  password: string;
  confirmPassword: string;
}

@Injectable()
export class UsersService {
  private usersData = new Subject<Page<User>>();
  usersData$ = this.usersData.asObservable();
  private userTasksData = new Subject<Page<Task>>();
  userTasksData$ = this.userTasksData.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(params: Params): Observable<Page<User>> {
    return this.http
      .get<Page<User>>(`${environment.api}/users`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.usersData.next(res)));
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.api}/users/${id}`);
  }

  getUserTasks(params: Params, id: number): Observable<Page<Task>> {
    return this.http
      .get<Page<Task>>(`${environment.api}/tasks/assignedUser/${id}`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.userTasksData.next(res)));
  }

  postUser(user: PostUserData): Observable<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${environment.api}/users`, user);
  }

  deleteUser(id: number): Observable<null> {
    return this.http.delete<null>(`${environment.api}/users/${id}`);
  }

  putUser(user: PutUserData, id: number): Observable<CreatedResponse> {
    return this.http.put<CreatedResponse>(`${environment.api}/users/${id}`, user);
  }

  updateUserPassword(updatedPw: UpdatedPasswordData, id: number): Observable<CreatedResponse> {
    return this.http.put<CreatedResponse>(`${environment.api}/users/password/${id}`, updatedPw);
  }
}
