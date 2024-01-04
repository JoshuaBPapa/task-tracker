import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Params } from '@angular/router';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [SharedModule],
  providers: [UnsubscribeService],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Begin typing to search...';
  @Output() search = new EventEmitter<Params>();
  input = new FormControl('', { nonNullable: true });

  constructor(private unsubscribeService: UnsubscribeService) {}

  ngOnInit(): void {
    const inputSub = this.input.valueChanges
      .pipe(
        debounceTime(500),
        map((search) => search.trim()),
        distinctUntilChanged()
      )
      .subscribe((search) => this.search.emit({ search }));
    this.unsubscribeService.addSubscription(inputSub);
  }

  ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeAll();
  }
}
