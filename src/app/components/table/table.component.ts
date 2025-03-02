import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPerson } from '../../interfaces/person';
import { IContact } from '../../interfaces/contacts';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() pessoas: IPerson[] = [];
  @Input() contatos: IContact[] = [];
  @Input() isContactsTable: boolean = false;
  
  @Output() updatePersonEvent = new EventEmitter<IPerson>();
  @Output() deletePersonEvent = new EventEmitter<number >();
  @Output() viewContactsEvent = new EventEmitter<number>();
 
  
  updatePerson(pessoa: IPerson) {
    this.updatePersonEvent.emit(pessoa);
  }

  deletePerson(id: number) {
    this.deletePersonEvent.emit(id); 
  }

  viewContacts(id:number){
    this.viewContactsEvent.emit(id);
  } 
};

