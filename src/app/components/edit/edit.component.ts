import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../interfaces/person';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  personId: number = 0;
  person: IPerson | null = null;
  editPersonForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient, 
    private utilsService: UtilsService
  ) {
   
    this.editPersonForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      endereco: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-?[0-9]{3}$')]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.personId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPerson();
  }

  loadPerson(): void {
    this.personService.getPersonById(this.personId).subscribe({
      next: (person) => {
        this.person = person;
        this.editPersonForm.patchValue(person); 
      },
      error: (error) => {
        alert('Erro ao carregar pessoa. Verifique o console para mais detalhes.');
      }
    });
  }

  buscarEndereco(): void {
    const cep = this.editPersonForm.get('cep')?.value;
    if (!cep) return;

    this.utilsService.buscarEndereco(cep).subscribe({
      next: (dados) => {
        if (!dados.erro) {
          this.editPersonForm.patchValue({
            endereco: `${dados.logradouro}, ${dados.bairro}`,
            cidade: dados.localidade,
            uf: dados.uf
          });
        } else {
          Swal.fire("Erro!", "CEP não encontrado.", "error");
        }
      }
    });
  }

  savePerson(): void {
    if (this.editPersonForm.valid) {
      const updatedPerson: IPerson = { ...this.person, ...this.editPersonForm.value };
      this.personService.updatePerson(updatedPerson).subscribe({
        next: (updatedPerson) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          alert('Erro ao atualizar pessoa. Verifique o console para mais detalhes.');
        }
      });
    } else {
      alert('Por favor, preencha o formulário corretamente.');
    }
  }

  goBack(): void {
    this.utilsService.goBack();
  }
}