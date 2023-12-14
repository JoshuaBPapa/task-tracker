import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PaginatorComponent],
    });
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handlePageChange should call pageChange.emit with the correct argument', () => {
    spyOn(component.pageChange, 'emit');
    component.handlePageChange({ page: 2 });
    expect(component.pageChange.emit).toHaveBeenCalledWith({ page: 3 });
  });
});
