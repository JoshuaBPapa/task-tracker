import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTableCellLink]',
  standalone: true,
})
export class TableCellLinkDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.padding = '1rem 0';
    this.el.nativeElement.style.display = 'inline-block';
    this.el.nativeElement.style.width = '100%';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.underline(true);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.underline(false);
  }

  private underline(isHover: boolean): void {
    if (isHover) this.el.nativeElement.style.textDecoration = 'underline';
    else this.el.nativeElement.style.textDecoration = 'none';
  }
}
