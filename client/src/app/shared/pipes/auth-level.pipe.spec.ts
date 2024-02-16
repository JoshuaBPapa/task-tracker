import { AuthLevelPipe } from './auth-level.pipe';

describe('AuthLevelPipe', () => {
  let pipe: AuthLevelPipe;

  beforeEach(() => {
    pipe = new AuthLevelPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct values', () => {
    expect(pipe.transform(1)).toBe('Basic');
    expect(pipe.transform(2)).toBe('Project Manager');
    expect(pipe.transform(3)).toBe('Admin');
    expect(pipe.transform(4)).toBe('Master Admin');
  });
});
