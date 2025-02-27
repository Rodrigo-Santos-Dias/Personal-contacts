import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import path from 'path';
import { EditComponent } from './components/edit/edit.component';
import { TableComponent } from './components/table/table.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
    {path: "" ,component: ListComponent},
    {path: "list", component: ListComponent},
    {path:"update-person/:id", component: EditComponent},
    {path:"create-person", component: CreatePersonComponent},
    { path: "contatos/:id", component: ContactsComponent }

];
