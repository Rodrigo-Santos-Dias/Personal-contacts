import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { IPerson } from '../../interfaces/person';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-create-person',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.scss']
})
export class CreatePersonComponent {
  createPersonForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private utilsService: UtilsService,
    private router: Router
  ) {
    this.createPersonForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      endereco: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.pattern('^[0-9]{5}-?[0-9]{3}$')]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]]
    });
  }

  buscarEndereco(): void {
    const cep = this.createPersonForm.get('cep')?.value;
    if (!cep) return;

    this.utilsService.buscarEndereco(cep).subscribe({
      next: (dados) => {
        if (!dados.erro) {
          console.log("📍 Dados do CEP carregados:", dados);
          this.createPersonForm.patchValue({
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
    console.log('📤 Emitindo evento para edição:');
    if (this.createPersonForm.valid) {
      const newPerson: IPerson = this.createPersonForm.value;
      this.personService.createPerson(newPerson).subscribe({
        next: () => {
          Swal.fire("Sucesso!", "Pessoa cadastrada com sucesso!", "success").then(() => {
            this.router.navigate(['/']);
          });
        },
        error: () => {
          Swal.fire("Erro!", "Erro ao cadastrar a pessoa. Tente novamente.", "error");
        }
      });
    } else {
      Swal.fire("Atenção!", "Por favor, preencha o formulário corretamente.", "warning");
    }
  }

  goBack(): void {
    this.utilsService.goBack();
  }
}
