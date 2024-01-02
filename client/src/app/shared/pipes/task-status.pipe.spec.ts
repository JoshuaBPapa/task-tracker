import { TaskStatusPipe } from './task-status.pipe';

describe('TaskStatusPipe', () => {
  let pipe = new TaskStatusPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct values', () => {
    expect(pipe.transform(1)).toBe('Not Started');
    expect(pipe.transform(2)).toBe('In Progress');
    expect(pipe.transform(3)).toBe('In Review');
    expect(pipe.transform(4)).toBe('Complete');

    expect(pipe.transform(1, 'colour')).toBe('#f24049');
    expect(pipe.transform(2, 'colour')).toBe('#a100be');
    expect(pipe.transform(3, 'colour')).toBe('#03a9f4');
    expect(pipe.transform(4, 'colour')).toBe('#4caf50');

    expect(pipe.transform(1, 'icon')).toBe('pi pi-calendar-times');
    expect(pipe.transform(2, 'icon')).toBe('pi pi-clock');
    expect(pipe.transform(3, 'icon')).toBe('pi pi-eye');
    expect(pipe.transform(4, 'icon')).toBe('pi pi-check-circle');
  });
});
