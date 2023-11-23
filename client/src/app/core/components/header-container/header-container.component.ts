import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavLink } from '../types/nav-link';
import { linkList } from './link-list.const';
import { UserIconComponent } from 'src/app/components/user/user-icon/user-icon.component';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { LoggedInUser } from 'src/types/logged-in-user';

@Component({
  selector: 'app-header-container',
  standalone: true,
  imports: [NavComponent, SharedModule, UserIconComponent],
  templateUrl: './header-container.component.html',
  styleUrls: ['./header-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderContainerComponent implements OnInit {
  linkList: NavLink[] = linkList;
  isMobileNavOpen = false;
  currentUser: LoggedInUser;

  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthService) {}

  ngOnInit(): void {
    this.setHeaderProperties();
  }

  setHeaderProperties(): void {
    this.currentUser = this.authService.loggedInUser as LoggedInUser;
    if (this.currentUser.authLevel >= 4) {
      this.linkList = [
        ...linkList,
        {
          url: '/team',
          title: 'My Team',
          icon: 'pi pi-th-large',
        },
      ];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (event.target.innerWidth >= 768) {
      this.setIsMobileNavOpen(false);
    }
  }

  setIsMobileNavOpen(value: boolean): void {
    this.isMobileNavOpen = value;

    if (value) {
      this.document.body.classList.add('lock-scroll');
    } else {
      this.document.body.classList.remove('lock-scroll');
    }
  }
}
