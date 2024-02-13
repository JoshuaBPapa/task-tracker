import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
import { CommentListComponent } from 'src/app/components/comments/comment-list/comment-list.component';
import { PostCommentComponent } from 'src/app/components/comments/post-comment/post-comment.component';
import { LoadingSpinnerComponent } from 'src/app/components/loading-spinner/loading-spinner.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { TaskPriorityTagComponent } from 'src/app/components/tags/task-priority-tag/task-priority-tag.component';
import { TaskStatusTagComponent } from 'src/app/components/tags/task-status-tag/task-status-tag.component';
import { AssignedUserComponent } from 'src/app/components/user/assigned-user/assigned-user.component';
import { CommentsService } from 'src/app/services/comments.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { TextTruncateDirective } from 'src/app/shared/directives/text-truncate.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentForm } from 'src/types/forms/comment-form';
import { Page } from 'src/types/page';
import { Comment } from 'src/types/responses/comment';
import { TaskDetailed } from 'src/types/responses/task';

@Component({
  selector: 'app-task-details-container',
  standalone: true,
  imports: [
    SharedModule,
    TaskPriorityTagComponent,
    TaskStatusTagComponent,
    AssignedUserComponent,
    CommentListComponent,
    PostCommentComponent,
    PaginatorComponent,
    LoadingSpinnerComponent,
    TextTruncateDirective,
  ],
  providers: [CommentsService, UnsubscribeService],
  templateUrl: './task-details-container.component.html',
  styleUrls: ['./task-details-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailsContainerComponent implements OnInit, OnDestroy {
  task: TaskDetailed;
  isCommentsLoading = new BehaviorSubject(false);
  commentsPageNumber = new BehaviorSubject<{ page: number }>({ page: 1 });
  commentsData$: Observable<Page<Comment>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
    private unsubscribeService: UnsubscribeService,
    private errorHandlingService: ErrorHandlingService,
    private formValidationService: FormValidationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ task }) => {
      this.task = task;
    });
    this.commentsData$ = this.commentsService.commentsData$;
    this.subscribeToCommentsPageNumber();
  }

  subscribeToCommentsPageNumber(): void {
    this.commentsPageNumber
      .pipe(
        tap(() => this.isCommentsLoading.next(true)),
        switchMap((pageNumberParam) => {
          return this.commentsService
            .getComments(this.task.id, pageNumberParam)
            .pipe(
              catchError((err) =>
                this.errorHandlingService.handleError(err, this.isCommentsLoading)
              )
            );
        })
      )
      .subscribe(() => this.isCommentsLoading.next(false));
  }

  onCommentPost(commentForm: FormGroup<CommentForm>): void {
    if (!this.formValidationService.checkIsFormValid(commentForm)) return;
    const { comment } = commentForm.getRawValue();
    const commentData = { comment, taskId: this.task.id };
    this.isCommentsLoading.next(true);
    this.commentsService
      .postComment(commentData)
      .pipe(
        catchError((err) =>
          this.errorHandlingService.handleError(err, this.isCommentsLoading, commentForm)
        )
      )
      .subscribe(() => {
        this.isCommentsLoading.next(false);
        this.commentsPageNumber.next({ page: 1 });
      });
  }

  onCommentsPageChange(page: { page: number }): void {
    this.commentsPageNumber.next(page);
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
