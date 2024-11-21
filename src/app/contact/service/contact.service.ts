import { environment } from './../../../../.environment';
import { HandleService } from './handle.service';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root', 
})
export class ContactService {

  contactForm!: FormGroup;

  constructor(
    private handleService:HandleService,
  ){}

  //valid data of forms
  public validForms(form:FormGroup){
    //assign value a var
    this.contactForm = form;

    //Valid if status forms is valid or not
    this.contactForm.valid ? 
      this.sendEmail():this.handleService.handleInvalidForm();
  }


  public sendEmail() {
    this.sendDataForms(this.contactForm.value)
      .then(() => this.handleService.handleSuccess(this.contactForm))
      .catch((error) => this.handleService.handleError(error));
  }

  //send data of forms a email
  public sendDataForms(templateParams: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      environment.serviceId,
      environment.templateId,
      templateParams, 
      environment.userId
    );
  }



}
