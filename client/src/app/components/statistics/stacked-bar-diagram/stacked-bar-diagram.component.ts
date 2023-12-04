import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { StackedBarDiagramConfig } from 'src/types/chart-configs/stacked-bar-diagram-config';

interface StackedBarDiagramLabel {
  proportion: number;
  label: string;
  colour: string;
  value: number;
}

@Component({
  selector: 'app-stacked-bar-diagram',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './stacked-bar-diagram.component.html',
  styleUrls: ['./stacked-bar-diagram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedBarDiagramComponent implements OnInit {
  @Input() data: { [key: string]: number };
  @Input() config: StackedBarDiagramConfig[];
  total = 0;
  labels: StackedBarDiagramLabel[] = [];

  ngOnInit(): void {
    this.setTotal();
    this.setLabels();
  }

  setTotal(): void {
    let count = 0;
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        const value = this.data[key];
        count += value;
      }
    }
    this.total = count;
  }

  setLabels(): void {
    this.labels = this.config.map((barConfig) => {
      const { label, colour } = barConfig;
      const value = this.data[barConfig.dataKey];
      const proportion = (value / this.total) * 100;

      return { value, proportion, label, colour };
    });
  }
}
