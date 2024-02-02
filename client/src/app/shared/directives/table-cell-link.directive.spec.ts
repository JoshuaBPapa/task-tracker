import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellLinkTestComponent } from './table-cell-link-test.component';
import { TableCellLinkDirective } from './table-cell-link.directive';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TableCellLinkDirective', () => {
  let directive: TableCellLinkDirective;
  let component: TableCellLinkTestComponent;
  let fixture: ComponentFixture<TableCellLinkTestComponent>;
  let tdEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableCellLinkTestComponent],
    });
    fixture = TestBed.createComponent(TableCellLinkTestComponent);
    component = fixture.componentInstance;
    tdEl = fixture.debugElement.query(By.css('td'));
    directive = new TableCellLinkDirective(tdEl);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the correct styles', () => {
    expect(tdEl.nativeElement.style.padding).toBe('1rem 0px');
    expect(tdEl.nativeElement.style.display).toBe('inline-block');
    expect(tdEl.nativeElement.style.width).toBe('100%');
  });

  it('underline should set the correct style depending on the value of isHover', () => {
    expect(tdEl.nativeElement.style.textDecoration).toBe('');

    // @ts-expect-error
    directive.underline(true);
    expect(tdEl.nativeElement.style.textDecoration).toBe('underline');

    // @ts-expect-error
    directive.underline(false);
    expect(tdEl.nativeElement.style.textDecoration).toBe('none');
  });
});
