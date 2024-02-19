import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/types/page';
import { CreatedResponse } from 'src/types/responses/created-response';
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

@Injectable()
export class UsersService {
  private usersData = new Subject<Page<User>>();
  usersData$ = this.usersData.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(params: Params): Observable<Page<User>> {
    return this.http
      .get<Page<User>>(`${environment.api}/users`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.usersData.next(res)));
  }

  postUser(user: PostUserData): Observable<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${environment.api}/users`, user);
  }
}
