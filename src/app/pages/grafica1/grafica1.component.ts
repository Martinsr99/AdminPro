import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html'
})
export class Grafica1Component {
  // Doughnut
  public labels1: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
}
