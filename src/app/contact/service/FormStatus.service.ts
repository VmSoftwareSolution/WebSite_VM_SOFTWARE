import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormStatusService {
  public formStatusChanged: EventEmitter<{ success: boolean, message: string } | null> = new EventEmitter();

  private formStatus: { success: boolean, message: string } | null = null;

  public getFormStatus(): { success: boolean, message: string } | null {
    return this.formStatus;
  }

  public setFormStatus(status: { success: boolean, message: string } | null): void {
    this.formStatus = status;
    this.formStatusChanged.emit(this.formStatus);
  }

  public clearFormStatusAfterDelay(): void {
    setTimeout(() => {
      this.setFormStatus(null);
    }, 5000);
  }
}
