export interface StatisticsTask {
  id: number;
  title: number;
  status: number;
  priority: number;
  dateTimeCreated: string;
  dateTimeUpdated: string;
}

export interface StatisticCounts {
  totalTasksCount: number;
  severeTasksCount: number;
  tasksNotStartedCount: number;
  tasksAssignedCount: number;
  statusCounts: { [key: string]: number };
}

export interface Statistics extends StatisticCounts {
  tenLatestTasks: StatisticsTask[];
  tenMostSevereTasks: StatisticsTask[];
}
