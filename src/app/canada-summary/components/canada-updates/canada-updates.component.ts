import { Component, OnInit } from '@angular/core';
import { CanadaDataService } from 'src/app/services/canada-data.service';

@Component({
  selector: 'app-canada-updates',
  templateUrl: './canada-updates.component.html',
  standalone:false,
  styleUrls: ['./canada-updates.component.scss']
})
export class CanadaUpdatesComponent implements OnInit {
  canadaSummary: any = null;
  ontarioSummary: any = null;

  errorMessageCanada = '';
  errorMessageOntario = '';

  constructor(private canadaService: CanadaDataService) {}

  ngOnInit(): void {
    this.loadCanadaSummary();
    this.loadOntarioSummary();
  }

  loadCanadaSummary() {
  this.canadaService.getCanadaSummary().subscribe({
    next: data => {
      const canadaData = data.filter(d => d.prname === 'Canada');
      if (canadaData.length === 0) {
        this.errorMessageCanada = 'Canada summary not found.';
        return;
      }

     
      const latestDate = canadaData.reduce(
        (latest, item) => !latest || item.date > latest ? item.date : latest,
        ''
      );

      const totals = {
        numtotal_last7: 0,
        totalcases: 0,
        numdeaths_last7: 0,
        numdeaths: 0,
        avgdeaths_last7: 0,
        date: latestDate  };

      canadaData.forEach(item => {
        totals.numtotal_last7 += Number(item.numtotal_last7) || 0;
        totals.totalcases += Number(item.totalcases) || 0;
        totals.numdeaths_last7 += Number(item.numdeaths_last7) || 0;
        totals.numdeaths += Number(item.numdeaths) || 0;
        totals.avgdeaths_last7 += Number(item.avgdeaths_last7) || 0;
      });

      totals.avgdeaths_last7 = totals.avgdeaths_last7 / canadaData.length;

      this.canadaSummary = totals;
    },
    error: err => {
      this.errorMessageCanada = 'Error loading Canada summary.';
      console.error(err);
    }
  });
}



  loadOntarioSummary() {
  this.canadaService.getOntarioData().subscribe({
    next: data => {
      if (!data || data.length === 0) {
        this.errorMessageOntario = 'No Ontario vaccine data found.';
        return;
      }
      const latest = data[data.length - 1];

      const totals = {
        total_doses_administered: Number(latest.total_doses_administered) || 0,
        total_individuals_fully_vaccinated: Number(latest.total_individuals_fully_vaccinated) || 0,
        total_individuals_partially_vaccinated: Number(latest.total_individuals_partially_vaccinated) || 0,

        total_doses_in_fully_vaccinated_individuals: data.reduce((sum, d) => sum + (Number(d.total_doses_in_fully_vaccinated_individuals) || 0), 0),


        previous_day_total_doses_administered: data.reduce(
          (sum, d) => sum + (Number(d.previous_day_total_doses_administered) || 0), 0
        ),

        previous_day_at_least_one: data.reduce(
          (sum, d) => sum + (Number(d.previous_day_at_least_one) || 0), 0
        ),
      };

      this.ontarioSummary = totals;
    },
    error: err => {
      this.errorMessageOntario = 'Error loading Ontario vaccine data.';
      console.error(err);
    }
  });
}

}
