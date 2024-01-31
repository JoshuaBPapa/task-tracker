import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Params } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ParamsService } from 'src/app/services/params.service';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { UsersService } from 'src/app/services/users.service';
import { NamePipe } from 'src/app/shared/pipes/name.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { Page } from 'src/types/page';
import { User } from 'src/types/responses/user';
import { SelectorDataFilterComponent } from '../selector-data-filter/selector-data-filter.component';
import { UserIconComponent } from '../../user/user-icon/user-icon.component';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [SharedModule, SelectorDataFilterComponent, UserIconComponent, NamePipe],
  providers: [ParamsService, UnsubscribeService, UsersService, NamePipe],
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss'],
})
export class UserSelectorComponent implements OnInit, OnDestroy {
  @Input() control: FormControl<number | null>;
  @Input() selectedUserName: string;
  isLoading: BehaviorSubject<boolean>;
  options$: Observable<Page<User>>;

  constructor(
    private paramsService: ParamsService,
    private unsubscribeService: UnsubscribeService,
    private usersService: UsersService,
    private namePipe: NamePipe
  ) {}

  ngOnInit(): void {
    this.options$ = this.usersService.usersData$;
    this.subscribeToParams();
  }

  subscribeToParams(): void {
    this.isLoading = this.paramsService.isLoading;
    const paramsSub = this.paramsService
      .makeRequestOnParamsChange((params: Params) => this.usersService.getUsers(params))
      .subscribe();
    this.unsubscribeService.addSubscription(paramsSub);
  }

  handleFilter(search: Params): void {
    this.paramsService.setNewParamsValue(search);
  }

  handleSelect(user: User): void {
    this.control.setValue(user.id);
    this.selectedUserName = this.namePipe.transform(user.firstName, user.lastName);
  }

  handleClearSelected(): void {
    this.control.setValue(null);
    this.selectedUserName = '';
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
