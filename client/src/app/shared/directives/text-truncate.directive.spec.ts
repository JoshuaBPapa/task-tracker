import { DebugElement } from '@angular/core';
import { TextTruncateTestComponent } from './text-truncate-test.component';
import { TextTruncateDirective } from './text-truncate.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('TextTruncateDirective', () => {
  let directive: TextTruncateDirective;
  let component: TextTruncateTestComponent;
  let fixture: ComponentFixture<TextTruncateTestComponent>;
  let pEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TextTruncateTestComponent],
    });
    fixture = TestBed.createComponent(TextTruncateTestComponent);
    component = fixture.componentInstance;
    pEl = fixture.debugElement.query(By.css('p'));
    directive = new TextTruncateDirective(pEl);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set the correct styles', () => {
    expect(pEl.nativeElement.style.maxWidth).toBe('10px');
    expect(pEl.nativeElement.style.overflow).toBe('hidden');
    expect(pEl.nativeElement.style.textOverflow).toBe('ellipsis');
    expect(pEl.nativeElement.style.whiteSpace).toBe('nowrap');
  });
});
