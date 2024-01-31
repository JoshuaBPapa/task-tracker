import { FormControl } from '@angular/forms';

export interface TaskForm {
  title: FormControl<string>;
  projectId: FormControl<number | null>;
  assignedUserId: FormControl<number | null>;
  priority: FormControl<number>;
  status: FormControl<number>;
  description: FormControl<string>;
}
