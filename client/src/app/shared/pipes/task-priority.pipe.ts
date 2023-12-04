import { Pipe, PipeTransform } from '@angular/core';

const priorityConfig: { [key: number]: { text: string; colour: string; icon: string } } = {
  1: {
    text: 'Low',
    colour: '#4caf50',
    icon: 'pi pi-chevron-circle-down',
  },
  2: {
    text: 'Medium',
    colour: '#03a9f4',
    icon: 'pi pi-minus-circle',
  },
  3: {
    text: 'High',
    colour: '#ffc107',
    icon: 'pi pi-exclamation-circle',
  },
  4: {
    text: 'Severe',
    colour: '#f24049',
    icon: 'pi pi-exclamation-triangle',
  },
};

@Pipe({
  name: 'taskPriority',
  standalone: true,
})
export class TaskPriorityPipe implements PipeTransform {
  transform(value: number, type: 'text' | 'colour' | 'icon' = 'text'): string {
    return priorityConfig[value][type];
  }
}
