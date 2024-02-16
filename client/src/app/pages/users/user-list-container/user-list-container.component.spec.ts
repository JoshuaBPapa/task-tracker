import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListContainerComponent } from './user-list-container.component';

xdescribe('UserListContainerComponent', () => {
  let component: UserListContainerComponent;
  let fixture: ComponentFixture<UserListContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserListContainerComponent],
    });
    fixture = TestBed.createComponent(UserListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
