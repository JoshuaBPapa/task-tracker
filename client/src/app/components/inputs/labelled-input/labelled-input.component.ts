import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagePipe } from 'src/app/shared/pipes/validation-message.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-labelled-input',
  standalone: true,
  imports: [SharedModule, ValidationMessagePipe],
  templateUrl: './labelled-input.component.html',
  styleUrls: ['./labelled-input.component.scss'],
})
export class LabelledInputComponent {
  @Input() control: FormControl;
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() helpText = '';
}
