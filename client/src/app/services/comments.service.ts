import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from 'src/types/page';
import { Params } from 'src/types/params/params';
import { Comment } from 'src/types/responses/comment';
import { CreatedResponse } from 'src/types/responses/created-response';

interface PostCommentData {
  comment: string;
  taskId: number;
}

@Injectable()
export class CommentsService {
  private commentsData = new Subject<Page<Comment>>();
  commentsData$ = this.commentsData.asObservable();

  constructor(private http: HttpClient) {}

  getComments(taskId: number, params: Params): Observable<Page<Comment>> {
    return this.http
      .get<Page<Comment>>(`${environment.api}/comments/${taskId}`, {
        params: { ...params },
      })
      .pipe(tap((res) => this.commentsData.next(res)));
  }

  postComment(commentData: PostCommentData): Observable<CreatedResponse> {
    return this.http.post<CreatedResponse>(`${environment.api}/comments`, commentData);
  }
}
