import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contatos: Array<any>;
  formulario: FormGroup;

  constructor(private service: AppService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.configurarFormulario();

    this.service.listar()
      .subscribe(resposta => this.contatos = resposta);
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: [null, this.validarObrigatoriedade],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  validarObrigatoriedade(input: FormControl) {
    // input.hasError('obrigatoriedade').qualquer
    // this.formulario.get('nome').hasError('obrigatoriedade').qualquer;
    // No HTML: formulario.get('nome').errors?.obrigatoriedade?.qualquer;
    // return (input.value ? null : { obrigatoriedade: { qualquer: true } });

    return (input.value ? null : { obrigatoriedade: true });
  }

  criar() {
    this.service.criar(this.formulario.value).subscribe(resposta => {
      this.contatos.push(resposta);

      this.formulario.reset();
    });
  }
}
