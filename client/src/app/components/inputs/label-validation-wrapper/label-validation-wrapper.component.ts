import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessagePipe } from 'src/app/shared/pipes/validation-message.pipe';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-label-validation-wrapper',
  standalone: true,
  imports: [SharedModule, ValidationMessagePipe],
  templateUrl: './label-validation-wrapper.component.html',
  styleUrls: ['./label-validation-wrapper.component.scss'],
})
export class LabelValidationWrapperComponent {
  @Input() label = '';
  @Input() helpText = '';
  @Input() control: FormControl;
}
