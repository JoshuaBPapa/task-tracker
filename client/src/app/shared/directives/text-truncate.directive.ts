import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTextTruncate]',
  standalone: true,
})
export class TextTruncateDirective implements OnInit {
  @Input() maxWidth: string;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.setStyles();
  }

  setStyles(): void {
    this.el.nativeElement.style.maxWidth = this.maxWidth;
    this.el.nativeElement.style.overflow = 'hidden';
    this.el.nativeElement.style.textOverflow = 'ellipsis';
    this.el.nativeElement.style.whiteSpace = 'nowrap';
  }
}
