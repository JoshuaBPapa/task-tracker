import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamContainerComponent } from './team-container.component';
import { TeamService } from 'src/app/services/team.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { of } from 'rxjs';

describe('TeamContainerComponent', () => {
  let component: TeamContainerComponent;
  let fixture: ComponentFixture<TeamContainerComponent>;
  const teamServiceSpy = jasmine.createSpyObj('TeamService', ['deleteTeam']);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
  const modalDataServiceSpy = jasmine.createSpyObj('ModalDataService', ['sendRequest']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamContainerComponent],
      providers: [
        { provide: ModalDataService, useValue: modalDataServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
    TestBed.overrideProvider(TeamService, { useValue: teamServiceSpy });

    fixture = TestBed.createComponent(TeamContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onOpenDeleteModal should set isDeleteModalVisible to true', () => {
    component.onOpenDeleteModal();
    expect(component.isDeleteModalVisible).toBeTrue();
  });

  it('handleDeleteModalClose should set isDeleteModalVisible to false', () => {
    component.handleDeleteModalClose();
    expect(component.isDeleteModalVisible).toBeFalse();
  });

  it('handleDeleteModalConfirm should set isDeleteModalVisible to false', () => {
    modalDataServiceSpy.sendRequest.and.returnValue(of(() => {}));
    component.handleDeleteModalConfirm();
    expect(modalDataServiceSpy.sendRequest).toHaveBeenCalled();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
