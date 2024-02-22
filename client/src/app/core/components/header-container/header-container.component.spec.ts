import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderContainerComponent } from './header-container.component';
import { LoggedInUser } from 'src/types/logged-in-user';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { linkList } from './link-list.const';
import { NavLink } from '../types/nav-link';

const mockLoggedInUser: LoggedInUser = {
  firstName: 'John',
  lastName: 'Doe',
  authLevel: 4,
  teamId: 1,
  pictureColour: '#7239EA',
  jobTitle: 'CEO',
  teamName: 'Mock Team',
  userId: 1,
  username: 'JohnDoe',
};

const mockLinks: NavLink[] = [
  ...linkList,
  {
    url: '/team',
    title: 'Delete Team',
    icon: 'pi pi-trash',
  },
];

describe('HeaderContainerComponent', () => {
  let component: HeaderContainerComponent;
  let fixture: ComponentFixture<HeaderContainerComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderContainerComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
    fixture = TestBed.createComponent(HeaderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setHeaderProperties on init', () => {
    spyOn(component, 'setHeaderProperties');
    component.ngOnInit();
    expect(component.setHeaderProperties).toHaveBeenCalled();
  });

  it('setHeaderProperties should set the right properties in the component', () => {
    component.setHeaderProperties();
    expect(component.currentUser).toEqual(mockLoggedInUser);
    expect(component.linkList).toEqual(mockLinks);
  });

  it('onResize should call setIsMobileNavOpen if the given innerWidth is >= 768', () => {
    spyOn(component, 'setIsMobileNavOpen');
    component.isMobileNavOpen = true;
    component.onResize({ target: { innerWidth: 600 } });
    expect(component.setIsMobileNavOpen).not.toHaveBeenCalled();

    component.onResize({ target: { innerWidth: 800 } });
    expect(component.setIsMobileNavOpen).toHaveBeenCalled();
  });

  it('setIsMobileNavOpen should set the isMobileNavOpen property and add or remove a class from body', () => {
    expect(component.isMobileNavOpen).toBeFalse();

    component.setIsMobileNavOpen(true);
    expect(component.isMobileNavOpen).toBeTrue();
    expect(document.body.classList).toContain('lock-scroll');

    component.setIsMobileNavOpen(false);
    expect(component.isMobileNavOpen).toBeFalse();
    expect(document.body.classList).not.toContain('lock-scroll');
  });

  it('handleLogout should call authService.logout', () => {
    component.handleLogout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
