import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class FormularioUtilService {

  constructor(private alertaServicio: MessageService) { }

  verificarFormulario(formulario: FormGroup): void {
    this.markFieldsAsTouched(formulario);
    this.showErrorMessage(formulario);
  }

  markFieldsAsTouched(formulario: FormGroup) {
    Object.keys(formulario.controls).forEach(field => {
      const control = formulario.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  showErrorMessage(formulario: FormGroup) {
    let message = 'Por favor, complete los siguientes campos: ';
    const invalidFields: string[] = [];
    
    Object.keys(formulario.controls).forEach(field => {
      const control = formulario.get(field);
      if (control && control.invalid) {
        invalidFields.push(field);
      }
    });

    if (invalidFields.length) {
      message += invalidFields.join(', ');
    }

    this.alertaServicio.add({ severity: 'error', summary: 'Error', detail: message });
  }

  campoInvalido(formulario: FormGroup, nombreCampo: string): boolean {
    const campo = formulario.get(nombreCampo);
    return !!campo && campo.invalid && campo.touched;
  }
}