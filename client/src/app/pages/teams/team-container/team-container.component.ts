import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TeamService } from 'src/app/services/team.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ModalDataService } from 'src/app/services/modal-data.service';
import { NotificationCardComponent } from 'src/app/components/cards/notification-card/notification-card.component';
import { DeleteModalComponent } from 'src/app/components/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-team-container',
  standalone: true,
  imports: [SharedModule, NotificationCardComponent, DeleteModalComponent],
  providers: [TeamService],
  templateUrl: './team-container.component.html',
  styleUrls: ['./team-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamContainerComponent {
  isDeleteModalVisible = false;

  constructor(
    private teamService: TeamService,
    private authService: AuthService,
    private modalDataService: ModalDataService
  ) {}

  onOpenDeleteModal(): void {
    this.isDeleteModalVisible = true;
  }

  handleDeleteModalClose(): void {
    this.isDeleteModalVisible = false;
  }

  handleDeleteModalConfirm(): void {
    this.modalDataService
      .sendRequest(this.teamService.deleteTeam(), 'Team Deleted')
      .subscribe(() => this.authService.logout());
  }
}
