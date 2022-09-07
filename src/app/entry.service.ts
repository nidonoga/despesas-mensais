import { TestBed } from '@angular/core/testing';
import { Constants } from './util/constants';
import { Entry } from './model/entry';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  URL = Constants.URL_ENTRIES;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  listEntry(): Observable<Entry[]> {
    return this.httpClient.get<Entry[]>(this.URL);
  }

  getById(id: number): Observable<Entry> {
    return this.httpClient.get<Entry>(`${this.URL}/${id}`);
  }

  saveComObservable(entry: Entry): Observable<Entry> {
    return this.httpClient.post<Entry>(this.URL, entry, this.httpOptions);
  }

  saveOrUpdate(entry: Entry): Observable<Entry> {
    if (entry.id) {
      return this.update(entry);
    } else {
      return this.saveComObservable(entry);
    }
  }

  patch(entry: Entry): Observable<Entry> {
    return this.httpClient.patch<Entry>(
      `${this.URL}/${entry.id}`,
      entry,
      this.httpOptions
    );
  }

  update(entry: Entry): Observable<Entry> {
    return this.httpClient.put<Entry>(
      `${this.URL}/${entry.id}`,
      entry,
      this.httpOptions
    );
  }

  saveComPromise(entry: Entry) {
    let promise = new Promise<Entry>((resolve, reject) => {

      this.httpClient.post<Entry>(this.URL, entry, this.httpOptions)
        .toPromise()
        .then(
          res => {
            if(res != null) {
              resolve(res);
            } else {
              reject('Falha ao gravar registro');
            }

          })
          .catch((e) => {
            reject('Erro ao gravar registro!');
          });

    });
    return promise;
  }

  delete(id: number): Observable<Entry> {
    return this.httpClient.delete<Entry>(`${this.URL}/${id}`, this.httpOptions);
  }
}
