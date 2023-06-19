import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../model/data';
import { FormControl } from '@angular/forms';
import { DashboardFilter } from './filter.type';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit{
  @Input() data!: Data[];
  @Input() filters!: DashboardFilter;
  @Input() onFilterChange!: () => void;
  topics: string[] = [];
  sectors: string[] = [];
  regions: string[] = [];
  pests: string[] = [];
  swots: string[] = [];
  countries: string[] = [];
  cities: string[] = [];
  end_years: number[] = [];

  constructor() {

  }
  ngOnInit(): void {
    this.data.forEach(item => {
      if(item.topic && !this.topics.find(t => t == item.topic))
        this.topics.push(item.country);
      if(item.sector && !this.sectors.find(s => s == item.sector))
        this.sectors.push(item.sector);
      if(item.region && !this.regions.find(s => s == item.region))
        this.regions.push(item.region);
      if(item.pestle && !this.pests.find(s => s == item.pestle))
        this.pests.push(item.pestle);
      if(item.swat && !this.swots.find(s => s == item.swat))
        this.swots.push(item.swat);
      if(item.country && item.country && !this.countries.find(s => s == item.country))
        this.countries.push(item.country);
      if(item.city && !this.cities.find(s => s == item.city))
        this.cities.push(item.city);
      if(item.end_year && !this.end_years.find(s => s == item.end_year))
        this.end_years.push(item.end_year);
    });
  }

  onTopicChange(isChecked: boolean, topic: string) {
    isChecked ? this.filters.topic?.push(topic) : this.filters.topic.splice(this.filters.topic.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

  onSectorChange(isChecked: boolean, sector: string) {
    isChecked ? this.filters.sector?.push(sector) : this.filters.sector.splice(this.filters.sector.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

  onRegionChange(isChecked: boolean, region: string) {
    isChecked ? this.filters.region?.push(region) : this.filters.region.splice(this.filters.region.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

  onPestChange(isChecked: boolean, pest: string) {
    isChecked ? this.filters.pestle?.push(pest) : this.filters.pestle.splice(this.filters.topic.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

  onSwotChange(isChecked: boolean, swot: string) {
    isChecked ? this.filters.swat?.push(swot) : this.filters.swat.splice(this.filters.swat.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

  onCountryChange(isChecked: boolean, country: string) {
    isChecked ? this.filters.country?.push(country) : this.filters.country.splice(this.filters.country.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

  onCityChange(isChecked: boolean, city: string) {
    isChecked ? this.filters.city?.push(city) : this.filters.city.splice(this.filters.city.findIndex(t => t == t) - 1, 1);
    this.onFilterChange();
  }

}
