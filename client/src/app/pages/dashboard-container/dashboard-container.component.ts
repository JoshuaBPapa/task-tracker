import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { ErrorCardComponent } from 'src/app/components/cards/error-card/error-card.component';
import { LoadingCardComponent } from 'src/app/components/cards/loading-card/loading-card.component';
import { NotificationCardComponent } from 'src/app/components/cards/notification-card/notification-card.component';
import { CountCardComponent } from 'src/app/components/statistics/count-card/count-card.component';
import { StackedBarDiagramComponent } from 'src/app/components/statistics/stacked-bar-diagram/stacked-bar-diagram.component';
import { TopTenTasksTableComponent } from 'src/app/components/tables/top-ten-tasks-table/top-ten-tasks-table.component';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { TaskStatusPipe } from 'src/app/shared/pipes/task-status.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { StackedBarDiagramConfig } from 'src/types/chart-configs/stacked-bar-diagram-config';
import { StatisticsResponse } from 'src/types/responses/statistics-response';

@Component({
  selector: 'app-dashboard-container',
  standalone: true,
  imports: [
    SharedModule,
    CountCardComponent,
    TopTenTasksTableComponent,
    StackedBarDiagramComponent,
    LoadingCardComponent,
    ErrorCardComponent,
    NotificationCardComponent,
  ],
  providers: [TaskStatusPipe],
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardContainerComponent implements OnInit {
  statisticsData$: Observable<StatisticsResponse>;
  isLoading = new BehaviorSubject(false);
  isError = new BehaviorSubject(false);
  chartConfig: StackedBarDiagramConfig[] = [];

  constructor(
    private statisticsService: StatisticsService,
    private errorHandlingService: ErrorHandlingService,
    private taskStatusPipe: TaskStatusPipe
  ) {}

  ngOnInit(): void {
    this.isLoading.next(true);
    this.setChartConfig();
    this.setStatisticsDataObservable();
  }

  setChartConfig(): void {
    const config: StackedBarDiagramConfig[] = [];
    for (let i = 1; i < 5; i++) {
      config.push({
        label: this.taskStatusPipe.transform(i, 'text'),
        dataKey: i,
        colour: this.taskStatusPipe.transform(i, 'colour'),
      });
    }
    this.chartConfig = config;
  }

  setStatisticsDataObservable(): void {
    this.statisticsData$ = this.statisticsService.getStatistics().pipe(
      tap(() => this.isLoading.next(false)),
      catchError((err) => {
        this.isError.next(true);
        return this.errorHandlingService.handleError(err, this.isLoading);
      })
    );
  }
}