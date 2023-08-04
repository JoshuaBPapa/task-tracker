export interface Projects {
  id: number;
  name: string;
  totalTasks: number;
  severeTasks: number;
  assignedTasks: number;
  tasksNotStarted: number;
}

export interface SingleProject {
  id: number;
  name: string;
}
