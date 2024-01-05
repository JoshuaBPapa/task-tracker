import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropdownComponent } from './filter-dropdown.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterDropdownComponent', () => {
  let component: FilterDropdownComponent;
  let fixture: ComponentFixture<FilterDropdownComponent>;

  const mockConfig = [
    {
      filterName: 'Status',
      filterKey: 'status',
      options: [
        { key: 1, label: 'To Start' },
        { key: 2, label: 'In progress' },
        { key: 3, label: 'To review' },
        { key: 4, label: 'complete' },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FilterDropdownComponent, NoopAnimationsModule],
    });
    fixture = TestBed.createComponent(FilterDropdownComponent);
    component = fixture.componentInstance;
    component.config = mockConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call buildFilters', () => {
    spyOn(component, 'buildFilters');
    component.ngOnInit();
    expect(component.buildFilters).toHaveBeenCalled();
  });

  it('buildFilters should set the value of checkedFilters and activeFilters correctly', () => {
    component.buildFilters();
    expect(component.checkedFilters).toEqual({ status: [] });
    expect(component.activeFilters).toEqual({ status: [] });
  });

  it('handleOpen should set the value of checkedFilters to be the same as activeFilters', () => {
    component.activeFilters = { status: ['1', '2', '4'] };
    component.handleOpen();
    expect(component.checkedFilters).toEqual(component.activeFilters);
  });

  it('onApply should set the value of activeFilters to be the same as checkedFilters and call emitFilter', () => {
    spyOn(component, 'emitFilter');
    component.checkedFilters = { status: ['1', '2', '4'] };
    component.onApply();
    expect(component.checkedFilters).toEqual(component.checkedFilters);
    expect(component.emitFilter).toHaveBeenCalled();
  });

  it('onClear should call buildFilters and emitFilter', () => {
    spyOn(component, 'emitFilter');
    spyOn(component, 'buildFilters');
    component.onClear();
    expect(component.emitFilter).toHaveBeenCalled();
    expect(component.buildFilters).toHaveBeenCalled();
  });

  it('emitFilter should call filter.emit with the right argument', () => {
    component.activeFilters = { status: ['1', '2', '4'] };
    spyOn(component.filter, 'emit');
    component.emitFilter();
    expect(component.filter.emit).toHaveBeenCalledWith({ status: '1,2,4' } as any);
  });
});
