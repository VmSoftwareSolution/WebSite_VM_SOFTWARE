import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormStatusService } from './FormStatus.service';

@Injectable({
  providedIn: 'root',
})
export class HandleService {
  constructor(private formStatusService: FormStatusService) {}

  private contactForm!: FormGroup;

  public handleSuccess(value: FormGroup): void {
    this.formStatusService.setFormStatus({
      success: true,
      message: '¡Correo enviado correctamente! Nos pondremos en contacto pronto.',
    });

    this.contactForm = value;
    this.contactForm.reset();
    this.formStatusService.clearFormStatusAfterDelay();
  }

  public handleError(error: any): void {
    this.formStatusService.setFormStatus({
      success: false,
      message: 'Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.',
    });
    this.formStatusService.clearFormStatusAfterDelay();
  }

  public handleInvalidForm(): void {
    this.formStatusService.setFormStatus({
      success: false,
      message: 'Por favor, completa todos los campos correctamente.',
    });
    this.formStatusService.clearFormStatusAfterDelay();
  }
}
