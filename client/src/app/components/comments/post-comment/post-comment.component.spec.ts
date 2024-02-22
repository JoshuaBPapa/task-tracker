import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentComponent } from './post-comment.component';
import { LoggedInUser } from 'src/types/logged-in-user';
import { AuthService } from 'src/app/core/services/auth/auth.service';

const mockLoggedInUser: LoggedInUser = {
  firstName: 'John',
  lastName: 'Doe',
  authLevel: 4,
  teamId: 1,
  teamName: 'Mock Team',
  pictureColour: '#7239EA',
  jobTitle: 'CEO',
  userId: 1,
  username: 'JohnDoe',
};

describe('PostCommentComponent', () => {
  let component: PostCommentComponent;
  let fixture: ComponentFixture<PostCommentComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostCommentComponent],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    fixture = TestBed.createComponent(PostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of loggedInUser', () => {
    component.ngOnInit();
    expect(component.loggedInUser).toEqual(mockLoggedInUser);
  });

  it('onSubmit should call post.emit with the form', () => {
    spyOn(component.post, 'emit');
    component.onSubmit();
    expect(component.post.emit).toHaveBeenCalledWith(component.form);
  });
});
