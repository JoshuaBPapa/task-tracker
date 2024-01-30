import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabelValidationWrapperComponent } from '../label-validation-wrapper/label-validation-wrapper.component';

@Component({
  selector: 'app-labelled-input',
  standalone: true,
  imports: [SharedModule, LabelValidationWrapperComponent],
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
