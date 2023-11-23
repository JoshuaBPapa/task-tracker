import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderContainerComponent } from '../header-container/header-container.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [HeaderContainerComponent, SharedModule],
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {}
