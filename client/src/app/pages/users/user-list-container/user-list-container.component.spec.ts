import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListContainerComponent } from './user-list-container.component';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { Page } from 'src/types/page';
import { User } from 'src/types/responses/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthLevelPipe } from 'src/app/shared/pipes/auth-level.pipe';
import { AuthService } from 'src/app/core/services/auth/auth.service';

const mockUsersResponse: Page<User> = {
  results: [
    {
      id: 1,
      firstName: `John`,
      lastName: 'Doe',
      username: 'johndoe',
      authLevel: 1,
      jobTitle: 'Tester',
      pictureColour: 'red',
      assignedTasks: 5,
    },
    {
      id: 2,
      firstName: `Jane`,
      lastName: 'Doe',
      username: 'janedoe',
      authLevel: 3,
      jobTitle: 'Project Manager',
      pictureColour: 'blue',
      assignedTasks: 0,
    },
  ],
  total: 2,
  page: 1,
};

const mockLoggedInUser = {
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

describe('UserListContainerComponent', () => {
  let component: UserListContainerComponent;
  let fixture: ComponentFixture<UserListContainerComponent>;
  const modalDataServiceSpy = jasmine.createSpyObj('ModalDataService', ['sendRequest']);
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);
  const paramsServiceSpy = jasmine.createSpyObj(
    'ParamsService',
    ['setNewParamsValue', 'makeRequestOnParamsChange'],
    {
      isLoading: new BehaviorSubject(false),
      isError: new BehaviorSubject(false),
    }
  );
  const usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUsers', 'postUsers'], {
    usersData$: new Subject().asObservable(),
  });
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserListContainerComponent, NoopAnimationsModule],
      providers: [
        MessageService,
        { provide: ModalDataService, useValue: modalDataServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });
    TestBed.overrideProvider(UsersService, { useValue: usersServiceSpy });

    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockUsersResponse));

    fixture = TestBed.createComponent(UserListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of usersData$ and call subscribeToParams and setTableFilterConfig', () => {
    spyOn(component, 'setTableFilterConfig');
    spyOn(component, 'subscribeToParams');
    component.ngOnInit();
    expect(component.subscribeToParams).toHaveBeenCalled();
    expect(component.setTableFilterConfig).toHaveBeenCalled();
    component.usersData$.subscribe((res) => expect(res).toEqual(mockUsersResponse));
  });

  it('subscribeToParams should set the values of isLoading and isError and call paramsService.makeRequestOnParamsChange and unsubscribeService.addSubscription', () => {
    component.subscribeToParams();
    expect(paramsServiceSpy.makeRequestOnParamsChange).toHaveBeenCalled();
    expect(unsubscribeServiceSpy.addSubscription).toHaveBeenCalled();
    expect(component.isLoading).toEqual(paramsServiceSpy.isLoading);
    expect(component.isError).toEqual(paramsServiceSpy.isError);
  });

  it('updateParams should call paramsService.setNewParamsValue', () => {
    component.updateParams({ search: 'test' });
    expect(paramsServiceSpy.setNewParamsValue).toHaveBeenCalledWith({ search: 'test' });
  });

  it('setTableFilterConfig should call authLevelPipe.transform four times', () => {
    const authLevelPipeSpy = spyOn(AuthLevelPipe.prototype, 'transform');
    component.setTableFilterConfig();
    expect(authLevelPipeSpy).toHaveBeenCalledWith(1);
    expect(authLevelPipeSpy).toHaveBeenCalledWith(2);
    expect(authLevelPipeSpy).toHaveBeenCalledWith(4);
  });

  it('onOpenCreateModal should set isCreateModalVisible to true', () => {
    component.onOpenCreateModal();
    expect(component.isCreateModalVisible).toBeTrue();
  });

  it('handleCreateModalClose should set isCreateModalVisible to false', () => {
    component.handleCreateModalClose();
    expect(component.isCreateModalVisible).toBeFalse();
  });

  it('ngOnDestroy should call unsubscribeService.unsubscribeAll', () => {
    component.ngOnDestroy();
    expect(unsubscribeServiceSpy.unsubscribeAll).toHaveBeenCalled();
  });
});
