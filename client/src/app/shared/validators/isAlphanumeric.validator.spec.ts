import { FormControl } from '@angular/forms';
import { isAlphanumeric } from './isAlphanumeric.validator';

describe('isAlphanumeric', () => {
  const control = new FormControl('input', isAlphanumeric());

  it('should be a valid control if input is alphanumeric', () => {
    control.setValue('12345');
    expect(control.valid).toBeTrue();
  });

  it('should be an invalid control if input is not alphanumeric', () => {
    control.setValue('@@@@@');
    expect(control.valid).toBeFalse();
  });
});
