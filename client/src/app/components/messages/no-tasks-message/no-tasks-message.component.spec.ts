import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTasksMessageComponent } from './no-tasks-message.component';

describe('NoTasksMessageComponent', () => {
  let component: NoTasksMessageComponent;
  let fixture: ComponentFixture<NoTasksMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoTasksMessageComponent]
    });
    fixture = TestBed.createComponent(NoTasksMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
