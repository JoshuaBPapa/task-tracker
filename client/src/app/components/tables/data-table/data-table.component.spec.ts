import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableComponent } from './data-table.component';

const mockTableParams = { sortField: 'mock', sortOrder: 1, first: 0 };

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DataTableComponent],
    });
    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onChangeParam should call paramsChange.emit and buildTableParams with the right params', () => {
    spyOn(component.paramsChange, 'emit');
    spyOn(component, 'buildTableParams');
    component.onChangeParam(mockTableParams);
    expect(component.paramsChange.emit).toHaveBeenCalledWith(
      component.buildTableParams(
        mockTableParams.sortField,
        mockTableParams.sortOrder,
        mockTableParams.first
      )
    );
    expect(component.buildTableParams).toHaveBeenCalledWith(
      mockTableParams.sortField,
      mockTableParams.sortOrder,
      mockTableParams.first
    );
  });

  it('buildTableParams should return the right table params', () => {
    expect(
      component.buildTableParams(
        mockTableParams.sortField,
        mockTableParams.sortOrder,
        mockTableParams.first
      )
    ).toEqual({ page: 1, orderBy: 'mock-asc' });

    expect(
      component.buildTableParams(mockTableParams.sortField, -1, mockTableParams.first)
    ).toEqual({ page: 1, orderBy: 'mock-desc' });

    expect(component.buildTableParams(undefined, 1, mockTableParams.first)).toEqual({
      page: 1,
    });
  });
});
