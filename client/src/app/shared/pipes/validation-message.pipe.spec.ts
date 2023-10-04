import { ValidationMessagePipe } from './validation-message.pipe';

describe('ValidationMessagePipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationMessagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the right message depending on the error', () => {
    const pipe = new ValidationMessagePipe();
    const { transform } = pipe;

    expect(transform(null)).toBe('Please check if this field is valid');
    expect(transform({ required: true })).toBe('This field is required');
    expect(transform({ minlength: { requiredLength: 5 } })).toBe(
      'Must be at least 5 characters long'
    );
    expect(transform({ isNotAlphanumeric: true })).toBe(
      'Please only enter alphanumeric characters'
    );
    expect(transform({ notMatchingPasswords: true })).toBe(
      'Passwords do not match'
    );
    expect(transform({ serverSideError: 'Username taken' })).toBe(
      'Username taken'
    );
  });
});
