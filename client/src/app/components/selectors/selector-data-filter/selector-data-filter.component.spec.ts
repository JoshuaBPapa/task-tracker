import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDataFilterComponent } from './selector-data-filter.component';

describe('SelectorDataFilterComponent', () => {
  let component: SelectorDataFilterComponent;
  let fixture: ComponentFixture<SelectorDataFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectorDataFilterComponent],
    });
    fixture = TestBed.createComponent(SelectorDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleSearchInput should call filter.emit with the correct argument', () => {
    spyOn(component.filter, 'emit');
    component.handleSearchInput({ search: 'test' });
    expect(component.filter.emit).toHaveBeenCalledWith({ search: 'test' });
  });

  it('onSelected should call selector.hide and also select.emit with the correct argument', () => {
    spyOn(component.selector, 'hide');
    spyOn(component.select, 'emit');
    component.onSelected(1);
    expect(component.selector.hide).toHaveBeenCalled();
    expect(component.select.emit).toHaveBeenCalledWith(1);
  });

  it('onClearSelected should call selector.hide and clearSelected.emit', () => {
    spyOn(component.selector, 'hide');
    spyOn(component.clearSelected, 'emit');
    component.onClearSelected();
    expect(component.selector.hide).toHaveBeenCalled();
    expect(component.clearSelected.emit).toHaveBeenCalled();
  });
});
