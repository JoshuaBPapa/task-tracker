import { NamePipe } from './name.pipe';

describe('NamePipe', () => {
  let pipe: NamePipe;

  beforeEach(() => {
    pipe = new NamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should add the first name and last name of a person', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    expect(pipe.transform(firstName, lastName)).toBe('John Doe');
  });
});
