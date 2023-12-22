import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import { Router } from '@angular/router';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  const routerSpy = jasmine.createSpyObj(
    'router',
    ['navigateByUrl', 'getCurrentNavigation'],
    ['lastSuccessfulNavigation']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ErrorComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    });
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should redirect the user back to the dashboard if there are no errors present', () => {
    routerSpy.getCurrentNavigation.and.returnValue(null);
    TestBed.createComponent(ErrorComponent);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should display the correct message provided by router.getCurrentNavigation', () => {
    routerSpy.getCurrentNavigation.and.returnValue({
      extras: {
        state: {
          message: 'mock error',
        },
      },
    });
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.message).toBe('There was an error while trying to load this page. mock error');
  });

  it('should display the correct message provided by router.lastSuccessfulNavigation', () => {
    routerSpy.lastSuccessfulNavigation = {
      extras: {
        state: {
          message: 'mock error',
        },
      },
    };
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.message).toBe('There was an error while trying to load this page. mock error');
  });
});
