import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsContainerComponent } from './user-details-container.component';

xdescribe('UserDetailsContainerComponent', () => {
  let component: UserDetailsContainerComponent;
  let fixture: ComponentFixture<UserDetailsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserDetailsContainerComponent],
    });
    fixture = TestBed.createComponent(UserDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
