import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ContactService } from './service/contact.service';
import { FormStatusService } from './service/FormStatus.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let contactServiceSpy: jasmine.SpyObj<ContactService>;
  let formStatusServiceSpy: jasmine.SpyObj<FormStatusService>;

  beforeEach(() => {
    const contactServiceMock = jasmine.createSpyObj('ContactService', ['validForms']);
    const formStatusServiceMock = jasmine.createSpyObj('FormStatusService', ['formStatusChanged']);
    formStatusServiceMock.formStatusChanged = of(null); 

    TestBed.configureTestingModule({
      imports: [ContactComponent], 
      providers: [
        FormBuilder, 
        { provide: ContactService, useValue: contactServiceMock },
        { provide: FormStatusService, useValue: formStatusServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    contactServiceSpy = TestBed.inject(ContactService) as jasmine.SpyObj<ContactService>;
    formStatusServiceSpy = TestBed.inject(FormStatusService) as jasmine.SpyObj<FormStatusService>;

    fixture.detectChanges(); 
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.controls['name']).toBeDefined();
    expect(component.contactForm.controls['email']).toBeDefined();
    expect(component.contactForm.controls['company']).toBeDefined();
    expect(component.contactForm.controls['service']).toBeDefined();
    expect(component.contactForm.controls['project']).toBeDefined();
  });

  it('should call ContactService.validForms on form submission', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john.doe@example.com',
      company: 'Test Company',
      service: 'select',
      project: 'This is a test project description.',
    });


    component.onSubmit();

    expect(contactServiceSpy.validForms).toHaveBeenCalledWith(component.contactForm);
  });

});
