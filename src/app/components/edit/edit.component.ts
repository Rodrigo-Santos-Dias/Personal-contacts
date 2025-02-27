import { Component, OnInit } from '@angular/core';
import { IPerson } from '../../interfaces/person';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    private http: HttpClient 
  ) {
    // Inicializa o formulário com validações
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
        console.log("📝 Dados da pessoa carregados:", this.person); // Log para depuração
        this.editPersonForm.patchValue(person); // Preenche o formulário com os dados da pessoa
        console.log("📝 Formulário após patchValue:", this.editPersonForm.value); // Log para depuração
      },
      error: (error) => {
        console.error('❌ Erro ao carregar a pessoa:', error);
      }
    });
  }

  buscarEndereco(): void {
    const cep = this.editPersonForm.get('cep')?.value;
    
    if (cep && /^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (dados) => {
          if (!dados.erro) {
            this.editPersonForm.patchValue({
              endereco: `${dados.logradouro}, ${dados.bairro}`,
              cidade: dados.localidade,
              uf: dados.uf
            });
          } else {
            alert("CEP não encontrado.");
          }
        },
        error: () => {
          alert("Erro ao buscar o CEP.");
        }
      });
    }
  }

  savePerson(): void {
    console.log("📝 Formulário antes de salvar:", this.editPersonForm.value); // Log para depuração

    if (this.editPersonForm.valid) {
      const updatedPerson: IPerson = { ...this.person, ...this.editPersonForm.value }; // Atualiza os dados com os valores do formulário
      console.log("📝 Dados da pessoa atualizados:", updatedPerson); // Log para depuração

      this.personService.updatePerson(updatedPerson).subscribe({
        next: (updatedPerson) => {
          console.log('✅ Pessoa atualizada com sucesso:', updatedPerson);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('❌ Erro ao atualizar pessoa:', error);
          alert('Erro ao atualizar pessoa. Verifique o console para mais detalhes.');
        }
      });
    } else {
      console.error("❌ Formulário inválido. Erros:", this.editPersonForm.errors); // Log para depuração
      alert('Por favor, preencha o formulário corretamente.');
    }
  }
  goBack(): void {
    this.router.navigate(['/']); 
  }
}