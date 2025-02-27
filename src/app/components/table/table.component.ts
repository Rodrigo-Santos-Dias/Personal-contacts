import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPerson } from '../../interfaces/person';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() pessoas: IPerson[] = []; 
  @Output() updatePersonEvent = new EventEmitter<IPerson>();
  @Output() deletePersonEvent = new EventEmitter<number >();
  @Output() viewContactsEvent = new EventEmitter<number>();
  updatePerson(pessoa: IPerson) {
    console.log('📤 Emitindo evento para edição:', pessoa);
    this.updatePersonEvent.emit(pessoa);
  }

  deletePerson(id: number) {
    console.log("🗑️ Emitindo evento para exclusão:", id); // Log para depuração
    this.deletePersonEvent.emit(id); // Emitindo o ID da pessoa a ser excluída
  }

  viewContacts(id:number){
    console.log("Emitindo evento de contatos")
    this.viewContactsEvent.emit(id);
  }
 
}

