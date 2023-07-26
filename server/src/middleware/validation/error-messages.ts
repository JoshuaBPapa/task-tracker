export const requiredMsg = (): string => 'This field is required';

export const minMaxLengthMsg = (minValue: number, maxValue: number): string =>
  `Length must be between ${minValue} and ${maxValue} characters`;

export const minLengthMsg = (value: number): string => `Must have at least ${value} characters`;

export const maxLengthMsg = (value: number): string => `Can not have more than ${value} characters`;

export const alreadyExistsMsg = (): string => 'Already exists. Please try something different';

export const intOnlyMsg = (): string => 'Must be an integer';

export const betweenIntsMsg = (min: number, max: number): string =>
  `Must be number between ${min} and ${max}`;
