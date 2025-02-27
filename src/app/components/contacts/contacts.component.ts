import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../interfaces/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent implements OnInit {
  person: IPerson = {} as IPerson;
  id: number = 0;

constructor(private route: ActivatedRoute, private personService: PersonService) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.id = Number(params.get('id')); // Obtendo o ID corretamente
    console.log("🆔 ID recebido na página de contatos:", this.id);
    
    if (this.id) {
      this.loadPerson();
    } else {
      console.error("❌ Nenhum ID encontrado na URL.");
    }
  });
}
loadPerson(): void {
  this.personService.getPersonById(this.id).subscribe({
    next: (data) => {
      this.person = data;
      console.log("📋 Dados da pessoa carregados:", this.person);
    },
    error: (error) => console.error('❌ Erro ao carregar pessoa:', error)
  });
}

}

