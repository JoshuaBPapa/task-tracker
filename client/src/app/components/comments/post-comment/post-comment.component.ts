import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentForm } from 'src/types/forms/comment-form';
import { LoggedInUser } from 'src/types/logged-in-user';
import { UserIconComponent } from '../../user/user-icon/user-icon.component';
import { LabelValidationWrapperComponent } from '../../inputs/label-validation-wrapper/label-validation-wrapper.component';

@Component({
  selector: 'app-post-comment',
  standalone: true,
  imports: [SharedModule, UserIconComponent, LabelValidationWrapperComponent],
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss'],
})
export class PostCommentComponent implements OnInit {
  @Output() post = new EventEmitter<FormGroup<CommentForm>>();
  loggedInUser: LoggedInUser;
  form = this.nfb.group({
    comment: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  constructor(private nfb: NonNullableFormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser = this.authService.loggedInUser as LoggedInUser;
  }

  onSubmit(): void {
    this.post.emit(this.form);
  }
}
