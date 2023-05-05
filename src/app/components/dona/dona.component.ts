import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html'
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo'
  // Doughnut
  @Input('labels') labels1 = [ 'Pan', 'Refresco', 'Tacos' ];
  @Input('data') data1 : ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 10, 15, 50 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
}
