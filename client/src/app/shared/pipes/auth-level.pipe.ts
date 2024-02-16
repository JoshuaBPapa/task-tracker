import { Pipe, PipeTransform } from '@angular/core';

const authLevelConfig: { [key: number]: string } = {
  1: 'Basic',
  2: 'Project Manager',
  3: 'Admin',
  4: 'Master Admin',
};

@Pipe({
  name: 'authLevel',
  standalone: true,
})
export class AuthLevelPipe implements PipeTransform {
  transform(authLevel: number): string {
    return authLevelConfig[authLevel];
  }
}
