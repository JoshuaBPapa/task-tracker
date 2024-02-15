import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsContainerComponent } from './task-details-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { Page } from 'src/types/page';
import { Comment } from 'src/types/responses/comment';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TaskDetailed } from 'src/types/responses/task';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';

const mockTaskData: TaskDetailed = {
  id: 1,
  title: 'test',
  status: 1,
  priority: 4,
  dateTimeCreated: '2023-08-02T15:01:00.000Z',
  dateTimeUpdated: '2023-11-30T10:07:37.000Z',
  assignedUser: {
    id: 1,
    jobTitle: 'Developer',
    lastName: 'Doe',
    firstName: 'John',
    pictureColour: 'red',
  },
  description: '',
  project: {
    id: 1,
    name: 'Mock project',
  },
};
const mockCommentsData: Page<Comment> = {
  results: [
    {
      id: 1,
      comment: 'mock comment',
      dateTimeCreated: '',
      postedBy: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        jobTitle: 'Developer',
        pictureColour: 'red',
      },
    },
  ],
  page: 1,
  total: 1,
};
const mockLoggedInUser = {
  userId: 1,
  firstName: 'mock value',
  lastName: 'mock value',
  username: 'mock value',
  jobTitle: 'mock value',
  teamId: 1,
  authLevel: 1,
  pictureColour: 'mock value',
};

describe('TaskDetailsContainerComponent', () => {
  let component: TaskDetailsContainerComponent;
  let fixture: ComponentFixture<TaskDetailsContainerComponent>;
  const commentsServiceSpy = jasmine.createSpyObj(
    'CommentsService',
    ['getComments', 'postComment'],
    {
      commentsData$: of(mockCommentsData),
    }
  );
  const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
    loggedInUser: mockLoggedInUser,
  });
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);
  const activatedRouteStub = {
    data: of({ task: mockTaskData }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskDetailsContainerComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        MessageService,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    TestBed.overrideProvider(CommentsService, { useValue: commentsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });

    commentsServiceSpy.getComments.and.returnValue(of(mockCommentsData));

    fixture = TestBed.createComponent(TaskDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of task and commentsData$ and call subscribeToCommentsPageNumber', () => {
    spyOn(component, 'subscribeToCommentsPageNumber');
    component.ngOnInit();
    expect(component.task).toEqual(mockTaskData);
    component.commentsData$.subscribe((res) => expect(res).toEqual(mockCommentsData));
    expect(component.subscribeToCommentsPageNumber).toHaveBeenCalled();
  });

  it('subscribeToCommentsPageNumber should call unsubscribeService.addSubscription', () => {
    component.subscribeToCommentsPageNumber();
    expect(unsubscribeServiceSpy.addSubscription).toHaveBeenCalled();
  });

  it('ngOnDestroy should call unsubscribeService.unsubscribeAll', () => {
    component.ngOnDestroy();
    expect(unsubscribeServiceSpy.unsubscribeAll).toHaveBeenCalled();
  });

  it('onOpenEditModal should set isEditModalVisible to true', () => {
    component.onOpenEditModal();
    expect(component.isEditModalVisible).toBeTrue();
  });

  it('handleEditModalClose should set isEditModalVisible to false', () => {
    component.handleEditModalClose();
    expect(component.isEditModalVisible).toBeFalse();
  });

  it('onOpenDeleteModal should set isDeleteModalVisible to true', () => {
    component.onOpenDeleteModal();
    expect(component.isDeleteModalVisible).toBeTrue();
  });

  it('handleDeleteModalClose should set isDeleteModalVisible to false', () => {
    component.handleDeleteModalClose();
    expect(component.isDeleteModalVisible).toBeFalse();
  });

  it('onCommentsPageChange should call commentsPageNumber.next with the correct value', () => {
    spyOn(component.commentsPageNumber, 'next');
    component.onCommentsPageChange({ page: 2 });
    expect(component.commentsPageNumber.next).toHaveBeenCalledWith({ page: 2 });
  });
});
