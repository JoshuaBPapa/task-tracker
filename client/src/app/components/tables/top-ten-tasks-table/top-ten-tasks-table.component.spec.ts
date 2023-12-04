import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTenTasksTableComponent } from './top-ten-tasks-table.component';

describe('TopTenTasksTableComponent', () => {
  let component: TopTenTasksTableComponent;
  let fixture: ComponentFixture<TopTenTasksTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TopTenTasksTableComponent],
    });
    fixture = TestBed.createComponent(TopTenTasksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
