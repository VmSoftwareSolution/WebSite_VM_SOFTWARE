import { FormStatusService } from './service/FormStatus.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './service/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup;
  formStatus: { success: boolean, message: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private formStatusService:FormStatusService
  ){} 

  ngOnInit() {
    this.initializeForm();
    this.formStatusService.formStatusChanged.subscribe(status => {
      this.formStatus = status;
    });
  }

  
  private initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      service: ['select', [Validators.required]],
      project: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(){
    const result = this.contactService.validForms(this.contactForm);
  }


}
