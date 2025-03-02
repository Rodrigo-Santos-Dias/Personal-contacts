import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from './person.service';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private viaCepUrl = 'https://viacep.com.br/ws';

  constructor(
    private router: Router,
    private http: HttpClient, 
    private personService: PersonService) { }

  goBack(): void {
    this.router.navigate(['/']); 
  }


  buscarEndereco(cep: string): Observable<any> {
    const cepFormatado = cep.replace(/\D/g, ''); 

    if (!/^[0-9]{8}$/.test(cepFormatado)) {
      Swal.fire("Erro!", "CEP inválido. Deve conter 8 dígitos.", "error");
      return throwError(() => new Error("CEP inválido."));
    }

    return this.http.get(`${this.viaCepUrl}/${cepFormatado}/json`).pipe(
      catchError(() => {
        Swal.fire("Erro!", "Erro ao buscar o CEP.", "error");
        return throwError(() => new Error("Erro ao buscar o CEP."));
      })
    );
  }

}
