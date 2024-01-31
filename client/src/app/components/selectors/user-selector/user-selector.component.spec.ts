import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectorComponent } from './user-selector.component';
import { BehaviorSubject, Subject, of } from 'rxjs';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { Page } from 'src/types/page';
import { User } from 'src/types/responses/user';
import { UsersService } from 'src/app/services/users.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';

const mockUsersResponse: Page<User> = {
  results: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      username: 'johnDoe',
      authLevel: 4,
      jobTitle: 'Developer',
      pictureColour: '#009EF7',
      assignedTasks: 0,
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janeDoe',
      authLevel: 1,
      jobTitle: 'Developer',
      pictureColour: '#009EF7',
      assignedTasks: 0,
    },
  ],
  total: 2,
  page: 1,
};

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;
  const usersServiceSpy = jasmine.createSpyObj('UsersService', [], {
    usersData$: new Subject().asObservable(),
  });
  const paramsServiceSpy = jasmine.createSpyObj(
    'ParamsService',
    ['setNewParamsValue', 'makeRequestOnParamsChange'],
    {
      isLoading: new BehaviorSubject(false),
    }
  );
  const unsubscribeServiceSpy = jasmine.createSpyObj('UnsubscribeService', [
    'addSubscription',
    'unsubscribeAll',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserSelectorComponent],
      providers: [MessageService],
    });
    TestBed.overrideProvider(UsersService, { useValue: usersServiceSpy });
    TestBed.overrideProvider(ParamsService, { useValue: paramsServiceSpy });
    TestBed.overrideProvider(UnsubscribeService, { useValue: unsubscribeServiceSpy });

    paramsServiceSpy.makeRequestOnParamsChange.and.returnValue(of(mockUsersResponse));

    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    component.control = new FormControl(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set the value of options$ and call subscribeToParams', () => {
    spyOn(component, 'subscribeToParams');
    component.ngOnInit();
    expect(component.subscribeToParams).toHaveBeenCalled();
    component.options$.subscribe((res) => expect(res).toEqual(mockUsersResponse));
  });

  it('subscribeToParams should set the values of isLoading, call paramsService.makeRequestOnParamsChange and call unsubscribeService.addSubscription', () => {
    component.subscribeToParams();
    expect(paramsServiceSpy.makeRequestOnParamsChange).toHaveBeenCalled();
    expect(unsubscribeServiceSpy.addSubscription).toHaveBeenCalled();
    expect(component.isLoading).toEqual(paramsServiceSpy.isLoading);
  });

  it('handleFilter should call paramsService.setNewParamsValue', () => {
    component.handleFilter({ search: 'test' });
    expect(paramsServiceSpy.setNewParamsValue).toHaveBeenCalledWith({ search: 'test' });
  });

  it('handleSelect should call control.setValue and set the value of selectedProjectName', () => {
    spyOn(component.control, 'setValue');
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe' };
    component.handleSelect(mockUser as User);
    expect(component.control.setValue).toHaveBeenCalledWith(mockUser.id);
    expect(component.selectedUserName).toEqual('John Doe');
  });

  it("handleClearSelected should call control.setValue(null) and set the value of selectedProjectName to ''", () => {
    spyOn(component.control, 'setValue');
    component.handleClearSelected();
    expect(component.control.setValue).toHaveBeenCalledWith(null);
    expect(component.selectedUserName).toEqual('');
  });

  it('ngOnDestroy should call unsubscribeService.unsubscribeAll', () => {
    component.ngOnDestroy();
    expect(unsubscribeServiceSpy.unsubscribeAll).toHaveBeenCalled();
  });
});
