import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPerson } from '../../interfaces/person'; 
import { PersonService } from '../../services/person.service';
import { TableComponent } from '../table/table.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  persons: IPerson[] = []; 

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPersons(); 
  }

    loadPersons(): void {
    this.personService.getPersons().subscribe({
      next: (response: IPerson[]) => { 
        this.persons = response; 
        
      },
      error: (error) => {
        alert('Erro ao carregar pessoas. Verifique o console para mais detalhes.');
      }
    });
  }

  
  updatePerson(person: IPerson): void {
    this.router.navigate(['/update-person', person.id]); 
  }


  deletePerson(id: number): void {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.personService.deletePerson(id).subscribe({
          next: () => {
            Swal.fire(
              'Excluído!',
              'A pessoa foi excluída com sucesso.',
              'success'
            );
            
            this.persons = this.persons.filter(person => person.id !== id);
          },
          error: (error) => {
            Swal.fire(
              'Erro!',
              'Ocorreu um erro ao excluir a pessoa.',
              'error'
            );
          }
        });
      }
    });
  }
  

  goToContacts(id: number): void {
    this.router.navigate(['/contatos', id]);
  }
  
  
}