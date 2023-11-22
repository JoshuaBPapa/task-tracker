import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from './core/services/auth/auth.service';

describe('AppComponent', () => {
  let app: AppComponent;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['setLoggedInUser']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastModule],
      providers: [MessageService, { provide: AuthService, useValue: authServiceSpy }],
      declarations: [AppComponent],
    });
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call authService.setLoggedInUser on init', () => {
    app.ngOnInit();
    expect(authServiceSpy.setLoggedInUser).toHaveBeenCalled();
  });
});
