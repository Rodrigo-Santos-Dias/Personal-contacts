import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IContact } from '../interfaces/contacts';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl;

  getContactsByPersonId(personId: number): Observable<IContact[]> {
    return this.http.get<IContact[]>(`${this.url}/contatos/${personId}`);
  }

  createContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(`${this.url}/contatos`, contact);
  }

  updateContact(contact: IContact): Observable<IContact> {
    return this.http.put<IContact>(`${this.url}/contatos/${contact.id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/contatos/${id}`);
  }

}
