import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggedInUser } from 'src/types/logged-in-user';

const mockLoggedInUser: LoggedInUser = {
  firstName: 'John',
  lastName: 'Doe',
  authLevel: 4,
  teamId: 1,
  teamName: 'mock team name',
  pictureColour: '#7239EA',
  jobTitle: 'CEO',
  userId: 1,
  username: 'JohnDoe',
};

describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BaseComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
