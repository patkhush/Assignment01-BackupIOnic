
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OntarioService {
  private dataUrl = 'assets/data/ontarioData.json'; 

  constructor(private http: HttpClient) {}

  getOntarioData(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(this.dataUrl).pipe(
      map(response => response.data)  
    );
  }
}
