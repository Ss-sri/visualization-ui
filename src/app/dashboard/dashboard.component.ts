import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from '../dashboard-api.service';
import { Data } from '../model/data';
import { DashboardReq } from '../model/dashboard-req.model';
import { DashboardFilter } from '../filters/filter.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  data: Data[] = [];
  filterData: Data[] = [];
  isFilterLoading = true;
  isDataLoading = true;
  dashboardReq: DashboardReq = {};
  pieChartData: {label: string, value: number}[] = [];
  barChartData: {label: string, data: {label: string, value: number}[]}[] = [];
  filters: DashboardFilter = {
    endYear: [],
    topic: [],
    sector: [],
    region: [],
    pestle: [],
    swat: [],
    source: [],
    country: [],
    city: []
  };
  constructor(private readonly dashboardApiService: DashboardApiService){}
  ngOnInit(): void {
    this.getFilterData();
  }

  getDashbaordData = () => {
    this.isDataLoading = true;
    this.dashboardApiService.getDashboardData(this.filters).subscribe(res => {
      this.isDataLoading = false;
      console.log('res ::', res);
      this.data = res;
      this.pieChart(res);
      this.barChart(res);
    });
  }

  getFilterData = () => {
    this.isFilterLoading = true;
    this.dashboardApiService.getDashboardData(this.filters).subscribe(res => {
      console.log('res ::', res);
      this.isFilterLoading = false;
      this.filterData = res;
      let counter = 0;
      for(const data of res){
        if(data.country && !this.filters.country.find(c => c == data.country) && counter < 6) {
          this.filters.country.push(data.country);
          counter ++;
        }
      };
      this.getDashbaordData();
    });
  }

  pieChart(data: Data[]) {
    const dataMap = new Map<string, number>();
    this.pieChartData = [];
    data.forEach(data => {
      const country = data.country ?? 'Other';
      const count: number = dataMap.get(country) ?? 0;
      dataMap.set(country, count + data.intensity);
    })
    for(let key of dataMap.keys()) {
      this.pieChartData.push({label: key, value: dataMap.get(key) ?? 0})
    }
  }

  barChart(data: Data[]) {
    const countries: string[] = [];
    this.barChartData = [];
    data.forEach(data => {
      if(data.country && !countries.find(c => c == data.country))
        countries.push(data.country);
    })
    countries.forEach(country => {
      const countryData = this.data.filter(d => d.country == country);
      const dataMap = new Map<string,number>();
      countryData.forEach(data => {
        const sector = data.sector ?? 'Other';
        const count: number = dataMap.get(sector) ?? 0;
        dataMap.set(sector, count + 1);
      })
      const sectorData: {label: string, value: number}[] = []
      for(let key of dataMap.keys()) {
        const sectors = this.data.filter(data => data.sector === key);
        const totalIntensity = sectors.reduce((prv, item) => prv + item.intensity, 0);
        const count = dataMap.get(key) ?? 0;
        sectorData.push({label: key, value: totalIntensity / count})
      }
      this.barChartData.push({label: country, data: sectorData});
    });
  }

  onFilterChange = () => {
    this.getDashbaordData();
  }

}
