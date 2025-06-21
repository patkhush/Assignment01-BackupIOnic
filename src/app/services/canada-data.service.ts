import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanadaDataService {
  private canadaUrl = 'assets/data/canadaCovid19.json';
  private ontarioUrl = 'assets/data/ontarioData.json';

  constructor(private http: HttpClient) {}

  getCanadaSummary(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.canadaUrl).pipe(
      map(response => response.data)
    );
  }

  getOntarioData(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.ontarioUrl).pipe(
      map(response => response.data)
    );
  }
}
