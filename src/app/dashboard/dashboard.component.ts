import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from '../dashboard-api.service';
import { Data } from '../model/data';
import { DashboardReq } from '../model/dashboard-req.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  data: Data[] = [];
  isLoading = true;
  dashboardReq: DashboardReq = {};
  pieChartData: {label: string, value: number}[] = []; 
  constructor(private readonly dashboardApiService: DashboardApiService){}
  ngOnInit(): void {
    this.getDashbaordData();
  } 

  getDashbaordData() {
    this.dashboardApiService.getDashboardData(this.dashboardReq).subscribe(res => {
      this.isLoading = false;
      console.log('res ::', res);
      this.data = res;
      this.pieChart();
    });
  }

  pieChart() {
    const dataMap = new Map<string, number>();
    this.data.forEach(data => {
      const country = data.country ?? 'Other';
      const count: number = dataMap.get(country) ?? 0;
      dataMap.set(country, count + 1);
    })
    console.log(dataMap.keys())
    for(let key of dataMap.keys()) {
      this.pieChartData.push({label: key, value: dataMap.get(key) ?? 0})
    }
  }

}
