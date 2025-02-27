import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPerson } from '../../interfaces/person'; 
import { PersonService } from '../../services/person.service';
import { TableComponent } from '../table/table.component';
import { Router } from '@angular/router';

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
    this.loadPersons(); // Carrega a lista de pessoas ao inicializar o componente
  }

  // Método para carregar a lista de pessoas
  loadPersons(): void {
    this.personService.getPersons().subscribe({
      next: (response: IPerson[]) => { 
        this.persons = response; 
        console.log("📝 Lista de pessoas carregada ldp:", this.persons); // Log para depuração
      },
      error: (error) => {
        console.error('❌ Erro ao carregar pessoas:', error);
      }
    });
  }

  // Método para redirecionar para a página de edição
  updatePerson(person: IPerson): void {
    console.log("🔀 Redirecionando para edição da pessoa:", person);
    this.router.navigate(['/update-person', person.id]); 
  }

  // Método para excluir uma pessoa
  deletePerson(id: number): void {
    const confirmacao = confirm("Tem certeza que deseja excluir esta pessoa?");
  
    if (confirmacao) {
      this.personService.deletePerson(id).subscribe({
        next: () => {
          console.log(`✅ Pessoa com ID ${id} excluída com sucesso!`);
          
          // Atualiza a lista de pessoas sem precisar recarregar a página
          this.persons = this.persons.filter(person => person.id !== id);
        },
        error: (error) => {
          console.error('❌ Erro ao excluir pessoa:', error);
        }
      });
    }
  }

  goToContacts(id: number): void {
    console.log("aqui em go To contacts")
    this.router.navigate(['/contatos', id]); // Redireciona para a página de contatos
  }
  
  
}