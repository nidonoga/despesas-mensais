import { Movement } from './model/movement';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constants } from './util/constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  URL = Constants.URL_MOVEMENTS;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }


  listMoviment(): Observable<Movement[]> {
    return this.httpClient.get<Movement[]>(this.URL);
  }

  saveComObservable(movement: Movement): Observable<Movement> {
    return this.httpClient.post<Movement>(this.URL, movement, this.httpOptions);
  }

  update(movement: Movement): Observable<Movement> {
    return this.httpClient.put<Movement>(
      `${this.URL}/${movement.id}`,
      movement,
      this.httpOptions
    );
  }

  saveOrUpdate(movement: Movement): Observable<Movement> {
    if (movement.id) {
      return this.update(movement);
    } else {
      return this.saveComObservable(movement);
    }
  }

  patch(movement: Movement): Observable<Movement> {
    return this.httpClient.patch<Movement>(
      `${this.URL}/${movement.id}`,
      movement,
      this.httpOptions
    );
  }

  delete(id: number): Observable<Movement> {
    return this.httpClient.delete<Movement>(`${this.URL}/${id}`, this.httpOptions);
  }

  getById(id: number): Observable<Movement> {
    return this.httpClient.get<Movement>(`${this.URL}/${id}`);
  }


}
