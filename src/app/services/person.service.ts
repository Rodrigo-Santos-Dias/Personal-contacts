import {  Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

import { map, Observable, catchError, throwError } from 'rxjs';

import { IPerson } from '../interfaces/person';


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
    console.log("📡 Enviando requisição PUT para atualizar pessoa:", person);
    return this.http.put<IPerson>(`${this.url}/pessoas/${person.id}`, person).pipe(
      map((updatedPerson) => {
        console.log('Pessoa atualizada:', updatedPerson); 
        return updatedPerson;
      }),
      catchError((error: any) => {
        console.error('Erro ao atualizar pessoa', error); 
        return throwError(error);
      })
    );
  }

  deletePerson(id: number): Observable<void> { 
    console.log("📡 Enviando requisição DELETE para o ID:", id); 
    return this.http.delete<void>(`${this.url}/pessoas/${id}`);
  }

  createPerson(person: IPerson): Observable<IPerson> {
    console.log("ENviando requisi~çãom ")
    return this.http.post<IPerson>(`${this.url}/pessoas`, person);
  }
  
}