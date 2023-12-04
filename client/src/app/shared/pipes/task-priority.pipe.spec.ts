import { TaskPriorityPipe } from './task-priority.pipe';

describe('TaskPriorityPipe', () => {
  let pipe = new TaskPriorityPipe();

  beforeEach(() => {
    pipe = new TaskPriorityPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct values', () => {
    expect(pipe.transform(1)).toBe('Low');
    expect(pipe.transform(2)).toBe('Medium');
    expect(pipe.transform(3)).toBe('High');
    expect(pipe.transform(4)).toBe('Severe');

    expect(pipe.transform(1, 'colour')).toBe('#4caf50');
    expect(pipe.transform(2, 'colour')).toBe('#03a9f4');
    expect(pipe.transform(3, 'colour')).toBe('#ffc107');
    expect(pipe.transform(4, 'colour')).toBe('#f24049');

    expect(pipe.transform(1, 'icon')).toBe('pi pi-chevron-circle-down');
    expect(pipe.transform(2, 'icon')).toBe('pi pi-minus-circle');
    expect(pipe.transform(3, 'icon')).toBe('pi pi-exclamation-circle');
    expect(pipe.transform(4, 'icon')).toBe('pi pi-exclamation-triangle');
  });
});
