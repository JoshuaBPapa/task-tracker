import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterDropdownComponent } from 'src/app/components/filter-dropdown/filter-dropdown.component';
import { SearchInputComponent } from 'src/app/components/inputs/search-input/search-input.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { DataTableComponent } from 'src/app/components/tables/data-table/data-table.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { UserIconComponent } from 'src/app/components/user/user-icon/user-icon.component';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { UsersService } from 'src/app/services/users.service';
import { AuthLevelPipe } from 'src/app/shared/pipes/auth-level.pipe';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterDropdownConfig } from 'src/types/filter-dropdown-config/filter-dropdown-config';
import { Page } from 'src/types/page';
import { User } from 'src/types/responses/user';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [
    SharedModule,
    ToolbarComponent,
    SearchInputComponent,
    FilterDropdownComponent,
    DataTableComponent,
    PaginatorComponent,
    NamePipe,
    UserIconComponent,
    AuthLevelPipe,
  ],
  providers: [UsersService, ParamsService, UnsubscribeService, AuthLevelPipe],
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent implements OnInit {
  usersData$: Observable<Page<User>>;
  isLoading: BehaviorSubject<boolean>;
  isError: BehaviorSubject<boolean>;
  tableFilterConfig: FilterDropdownConfig[];
  tableHeaderConfig = [
    {
      key: 'firstName',
      label: 'Name',
    },
    {
      key: 'jobTitle',
      label: 'Job Title',
    },
    {
      key: 'authLevel',
      label: 'Auth Level',
    },
    {
      key: 'assignedTasks',
      label: 'Tasks',
    },
    {
      key: 'username',
      label: 'Username',
    },
  ];

  constructor(
    private usersService: UsersService,
    private paramsService: ParamsService,
    private unsubscribeService: UnsubscribeService,
    private authLevelPipe: AuthLevelPipe
  ) {}

  ngOnInit(): void {
    this.usersData$ = this.usersService.usersData$;
    this.setTableFilterConfig();
    this.subscribeToParams();
  }

  subscribeToParams(): void {
    this.isLoading = this.paramsService.isLoading;
    this.isError = this.paramsService.isError;
    const paramsSub = this.paramsService
      .makeRequestOnParamsChange((params: Params) => this.usersService.getUsers(params))
      .subscribe();
    this.unsubscribeService.addSubscription(paramsSub);
  }

  updateParams(params: Params): void {
    this.paramsService.setNewParamsValue(params);
  }

  setTableFilterConfig(): void {
    const config: FilterDropdownConfig = {
      filterName: 'Auth Level',
      filterKey: 'authLevel',
      options: [],
    };
    for (let i = 1; i <= 4; i++) {
      config.options.push({ key: i, label: this.authLevelPipe.transform(i) });
    }

    this.tableFilterConfig = [config];
  }
}
