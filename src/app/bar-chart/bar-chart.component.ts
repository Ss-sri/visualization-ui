import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnChanges{
  @Input() data: {label: string, data: {label: string, value: number}[]}[] = [];
  public chart!: Chart;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('chart changed');
    if(changes['chart']){
      this.chart.update();
    }
  }
  ngOnInit(): void {
    console.log('Bar-chart')
    if(this.data.length > 0)
      this.createChart();
  }

  createChart(){
    const labels = this.data[0].data.map(d => d.label);
    const dataSets = this.data.map(countryData =>
      ({label: countryData.label, data: countryData.data.map(d => d.value), borderWidth: 1})
    )
    const data = {
      labels: labels,
      datasets: dataSets,
    };
    this.chart = new Chart("BarChart", {
      type: 'bar',
      data,
      options: {
        plugins: {
          legend: {
            position: 'right'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

}
