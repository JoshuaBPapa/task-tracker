import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/types/page';
import { User } from 'src/types/responses/user';

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
}
