
import { Component, OnInit } from '@angular/core';
import { OntarioService } from 'src/app/services/ontario-data.service';

@Component({
  selector: 'app-ontario',
  templateUrl: './ontario.component.html',
  standalone:false,
  styleUrls: ['./ontario.component.scss'],
})
export class OntarioComponent implements OnInit {
  vaccineData: any[] = [];
  expandedIndex: number | null = null;
  totals: any = {};
  userNotes: { [date: string]: string } = {};
  noteInputs: { [date: string]: string } = {};

  constructor(private ontarioService: OntarioService) {}

  ngOnInit(): void {
    this.ontarioService.getOntarioData().subscribe({
      next: (data) => {
        this.vaccineData = data;
        this.calculateTotals();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  toggleExpand(i: number): void {
    this.expandedIndex = this.expandedIndex === i ? null : i;
  }

  saveNote(date: string): void {
    const text = this.noteInputs[date]?.trim();
    if (text) {
      this.userNotes[date] = text;
    }
  }

  calculateTotals(): void {
  if (!this.vaccineData.length) {
    this.totals = {};
    return;
  }

  const latest = this.vaccineData[this.vaccineData.length - 1];

  this.totals = {
    total_doses_administered: Number(latest.total_doses_administered) || 0,
    total_individuals_fully_vaccinated: Number(latest.total_individuals_fully_vaccinated) || 0,
    total_individuals_partially_vaccinated: Number(latest.total_individuals_partially_vaccinated) || 0,

    total_doses_in_fully_vaccinated_individuals: this.vaccineData.reduce(
      (sum, d) => sum + (Number(d.total_doses_in_fully_vaccinated_individuals) || 0),
      0
    ),

    previous_day_total_doses_administered: this.vaccineData.reduce(
      (sum, d) => sum + (Number(d.previous_day_total_doses_administered) || 0),
      0
    ),

    previous_day_at_least_one: this.vaccineData.reduce(
      (sum, d) => sum + (Number(d.previous_day_at_least_one) || 0),
      0
    ),
  };
}


}