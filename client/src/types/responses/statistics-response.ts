import { StatisticStatusCount } from '../statistics/statistics-status-count';
import { StatisticsTask } from '../statistics/statistics-task';

export interface StatisticsResponse {
  severeTasksCount: number;
  tasksAssignedCount: number;
  totalTasksCount: number;
  tasksNotStartedCount: number;
  statusCounts: StatisticStatusCount;
  tenLatestTasks: StatisticsTask[];
  tenMostSevereTasks: StatisticsTask[];
}
