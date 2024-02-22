import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContainerComponent } from './dashboard-container.component';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth/auth.service';

const mockChartConfig = [
  {
    label: 'Not Started',
    dataKey: 1,
    colour: '#f24049',
  },
  {
    label: 'In Progress',
    dataKey: 2,
    colour: '#a100be',
  },
  {
    label: 'In Review',
    dataKey: 3,
    colour: '#03a9f4',
  },
  {
    label: 'Complete',
    dataKey: 4,
    colour: '#4caf50',
  },
];
const mockData = {
  severeTasksCount: 1,
  tasksAssignedCount: 1,
  totalTasksCount: 1,
  tasksNotStartedCount: 1,
  statusCounts: {
    '1': 3,
    '2': 2,
    '3': 0,
    '4': 2,
  },
  tenLatestTasks: [
    {
      id: 1,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 2,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 3,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 4,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 5,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
  ],
  tenMostSevereTasks: [
    {
      id: 1,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 2,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 3,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 4,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
    {
      id: 5,
      title: 'Mock Task',
      status: 1,
      priority: 1,
      dateTimeCreated: '2023-07-26 14:52:10',
      dateTimeUpdated: '2023-07-26 14:52:10',
    },
  ],
};
const mockLoggedInUser = {
  userId: 1,
  firstName: 'mock value',
  lastName: 'mock value',
  username: 'mock value',
  jobTitle: 'mock value',
  teamId: 1,
  authLevel: 1,
  teamName: 'mock team',
  pictureColour: 'mock value',
};

describe('DashboardContainerComponent', () => {
  let component: DashboardContainerComponent;
  let fixture: ComponentFixture<DashboardContainerComponent>;
  const statisticsServiceSpy = jasmine.createSpyObj('StatisticsService', ['getStatistics']);
  const errorHandlingServiceSpy = jasmine.createSpyObj('ErrorHandlingService', ['handleError']);
  const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
    loggedInUser: mockLoggedInUser,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardContainerComponent, RouterTestingModule],
      providers: [
        { provide: StatisticsService, useValue: statisticsServiceSpy },
        { provide: ErrorHandlingService, useValue: errorHandlingServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    statisticsServiceSpy.getStatistics.and.returnValue(of(mockData));

    fixture = TestBed.createComponent(DashboardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set isLoading as true', () => {
    component.ngOnInit();
    expect(component.isLoading.value).toBe(true);
  });

  it('ngOnInit should call setChartConfig', () => {
    spyOn(component, 'setChartConfig');
    component.ngOnInit();
    expect(component.setChartConfig).toHaveBeenCalled();
  });

  it('ngOnInit should call setStatisticsDataObservable', () => {
    spyOn(component, 'setStatisticsDataObservable');
    component.ngOnInit();
    expect(component.setStatisticsDataObservable).toHaveBeenCalled();
  });

  it('ngOnInit should call set the value of teamName', () => {
    component.ngOnInit();
    expect(component.teamName).toEqual(mockLoggedInUser.teamName);
  });

  it('setChartConfig should set chartConfig correctly', () => {
    component.setChartConfig();
    expect(component.chartConfig).toEqual(mockChartConfig);
  });

  it('setStatisticsDataObservable should set statisticsData$ as an observable returned from statisticsService.getStatistics and set isLoading as false when subscribed to', () => {
    component.setStatisticsDataObservable();
    component.statisticsData$.subscribe((res) => {
      expect(res).toEqual(mockData);
      expect(component.isLoading.value).toBe(false);
    });
  });
});
