import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-barchart-ng',
  templateUrl: './barchart-ng.component.html',
  styleUrls: ['./barchart-ng.component.scss']
})
export class BarchartNgComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  chartType: String = 'bar';

  ngOnInit() {
    // to get random data at page actualisation
    this.randomize();
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true,
        max: 100, 
      },
      y: {
        stacked: true,
        // minimum height of each square in the chart
        min: 10, 
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'A Custom Stacked Bar Chart using random values'
      },
      legend: {
        display: true,
        position: 'bottom'
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    }
  };
  public barChartType: ChartType = 'line';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ 2006, 2007, 2008, 2009, 2010, 2011, 2012 ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series C' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public getRandom(upperLimit: number): number {
    return Math.round(Math.random() * upperLimit);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets.forEach(dataset => {
      for(let i = 0; i<dataset.data.length; i++) {
        let randomNum = dataset.data[i];
        dataset.data[i] = this.getRandom(100);
      }
    });
    this.chart?.update();
  }

  public typeSwitch(chartType: String): void {
    this.barChartType = chartType as ChartType;
  }

  public reset() {
    this.barChartData.datasets.forEach(dataset => {
      for(let i = 0; i<dataset.data.length; i++) {
        let randomNum = dataset.data[i];
        if (!this.barChartOptions?.scales) {
          dataset.data[i] = 10;
        } else {
          dataset.data[i] = this.barChartOptions?.scales['y']?.min ? 10 : 0 ;
        }
      }
    });
    this.chart?.update();
  }

  public addData(): void {
    let data = this.barChartData;
    if (!data) return;
    if (data.datasets.length > 0 && data.labels) {
      data.labels?.push(data.labels[data.labels.length-1] as number +1)
      for (let index = 0; index < data.datasets.length; ++index) {
        data.datasets[index].data.push(this.getRandom(100));
      }
    }
    this.chart?.update();
  }

}
