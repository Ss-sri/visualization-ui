import { Component, Input, OnInit } from '@angular/core';
import {Chart, registerables}  from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{
  @Input() data: {label: string, value: number}[] = [];
  public chart: any;

  constructor() {}
  ngOnInit(): void {
    if(this.data.length > 0)
      this.createChart();
    console.log('data ::', this.data);
  }

  createChart(){
    const labels = this.data.map(item => item.label);
    const counts = this.data.map(item => item.value);
    console.log('Data ::', labels, counts);
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
          labels,
          datasets: [{
              data: counts,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

}
