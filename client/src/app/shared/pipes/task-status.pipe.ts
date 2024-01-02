import { Pipe, PipeTransform } from '@angular/core';

const statusConfig: { [key: number]: { text: string; colour: string; icon: string } } = {
  1: {
    text: 'Not Started',
    colour: '#f24049',
    icon: 'pi pi-calendar-times',
  },
  2: {
    text: 'In Progress',
    colour: '#a100be',
    icon: 'pi pi-clock',
  },
  3: {
    text: 'In Review',
    colour: '#03a9f4',
    icon: 'pi pi-eye',
  },
  4: {
    text: 'Complete',
    colour: '#4caf50',
    icon: 'pi pi-check-circle',
  },
};

@Pipe({
  name: 'taskStatus',
  standalone: true,
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: number, type: 'text' | 'colour' | 'icon' = 'text'): string {
    return statusConfig[value][type];
  }
}
