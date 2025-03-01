import {  Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';


import { map, Observable, catchError, throwError } from 'rxjs';

import { IPerson } from '../interfaces/person';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class PersonService {

  url = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  getPersons(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${this.url}/pessoas`);
  }

  getPersonById(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.url}/pessoas/${id}`);
  }

  updatePerson(person: IPerson): Observable<IPerson> {
    return this.http.put<IPerson>(`${this.url}/pessoas/${person.id}`, person).pipe(
      map((updatedPerson) => {
        return updatedPerson;
      }),
      catchError((error: any) => { 
        return throwError(error);
      })
    );
  }

  deletePerson(id: number): Observable<void> { 
    return this.http.delete<void>(`${this.url}/pessoas/${id}`);
  }

  createPerson(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.url}/pessoas`, person);
  }

  loadPersons(route: ActivatedRoute): Observable<IPerson> {
    const id = Number(route.snapshot.paramMap.get('id'));

    if (!id) {
      throw new Error('ID inválido');
    } 

  return this.getPersonById(id); 
  }
  
    
}
