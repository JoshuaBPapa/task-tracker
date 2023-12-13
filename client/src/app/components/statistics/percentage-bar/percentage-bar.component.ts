import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-percentage-bar',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './percentage-bar.component.html',
  styleUrls: ['./percentage-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageBarComponent implements OnInit {
  @Input() value = 0;
  @Input() total = 0;
  @Input() invertColourValues = false;
  percentage = 100;
  colour = 'var(--green-500)';

  ngOnInit(): void {
    this.setPercentage();
    this.setColour();
  }

  setPercentage(): void {
    this.percentage = (this.value / this.total) * 100;
  }

  setColour(): void {
    if (this.invertColourValues) {
      if (this.percentage <= 25) this.colour = 'var(--green-500)';
      if (this.percentage > 75) this.colour = 'var(--red-500)';
    } else {
      if (this.percentage <= 25) this.colour = 'var(--red-500)';
      if (this.percentage > 75) this.colour = 'var(--green-500)';
    }

    if (this.percentage > 25 && this.percentage <= 75) this.colour = 'var(--orange-500)';
  }
}
