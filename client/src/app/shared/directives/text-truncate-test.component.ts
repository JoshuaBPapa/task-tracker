import { Component } from '@angular/core';
import { TextTruncateDirective } from './text-truncate.directive';

@Component({
  imports: [TextTruncateDirective],
  standalone: true,
  template: '<p appTextTruncate maxWidth="10px">Directive Test Component</p>',
})
export class TextTruncateTestComponent {}
