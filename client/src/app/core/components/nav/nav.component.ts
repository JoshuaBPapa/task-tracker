import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavLink } from '../types/nav-link';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  @Input() linkList: NavLink[];
  @Input() isMobileNavOpen = false;
  @Output() closeMobileNavMenu = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  onCloseMobileNavMenu(): void {
    this.closeMobileNavMenu.emit();
  }

  onLogout(): void {
    this.onCloseMobileNavMenu();
    this.logout.emit();
  }
}
