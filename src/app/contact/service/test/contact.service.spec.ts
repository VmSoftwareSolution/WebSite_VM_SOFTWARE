import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import { ContactService } from '../contact.service';
import { HandleService } from '../handle.service';
import { environment } from '../../../../../.environment';

describe('ContactService-UnitTest', () => {
  let service: ContactService;
  let handleServiceSpy: jasmine.SpyObj<HandleService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    const handleServiceMock = jasmine.createSpyObj('HandleService', ['handleInvalidForm', 'handleSuccess', 'handleError']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        ContactService,
        { provide: HandleService, useValue: handleServiceMock },
      ],
    });

    service = TestBed.inject(ContactService);
    handleServiceSpy = TestBed.inject(HandleService) as jasmine.SpyObj<HandleService>;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validForms', () => {
    it('should call sendEmail when form is valid', () => {
      const form: FormGroup = formBuilder.group({
        name: ['John Doe'],
        email: ['john.doe@example.com'],
      });

      spyOn(service, 'sendEmail').and.callThrough();

      service.validForms(form);

      expect(service.sendEmail).toHaveBeenCalled();
      expect(handleServiceSpy.handleInvalidForm).not.toHaveBeenCalled();
    });
  });

  describe('sendEmail', () => {
    it('should call sendDataForms and handleSuccess on success', async () => {
      spyOn(service, 'sendDataForms').and.returnValue(Promise.resolve({ status: 200 } as any));

      const form: FormGroup = formBuilder.group({
        name: ['John Doe'],
        email: ['john.doe@example.com'],
      });

      service.contactForm = form;

      await service.sendEmail();

      expect(service.sendDataForms).toHaveBeenCalledWith(form.value);
      expect(handleServiceSpy.handleSuccess).toHaveBeenCalledWith(form);
    });

  });

  describe('sendDataForms', () => {
    it('should call emailjs.send with the correct parameters', async () => {
      const emailJsSpy = spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200 } as any));

      const templateParams = { name: 'John Doe', email: 'john.doe@example.com' };

      await service.sendDataForms(templateParams);

      expect(emailJsSpy).toHaveBeenCalledWith(
        environment.serviceId,
        environment.templateId,
        templateParams,
        environment.userId
      );
    });

    it('should handle rejection from emailjs.send', async () => {
      spyOn(emailjs, 'send').and.returnValue(Promise.reject('Error'));

      try {
        await service.sendDataForms({});
      } catch (error) {
        expect(error).toBe('Error');
      }
    });
  });
});

describe('ContactService Integration', () => {
  let service: ContactService;
  let handleService: HandleService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [ContactService, HandleService],
    });

    service = TestBed.inject(ContactService);
    handleService = TestBed.inject(HandleService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('validForms integration', () => {
    it('should send email when form is valid', async () => {
      const form: FormGroup = formBuilder.group({
        name: ['John Doe'],
        email: ['john.doe@example.com'],
      });

      spyOn(service, 'sendEmail').and.callThrough();
      spyOn(handleService, 'handleInvalidForm');
      spyOn(handleService, 'handleSuccess');
      spyOn(service, 'sendDataForms').and.returnValue(Promise.resolve({ status: 200 } as any));

      service.validForms(form);

      expect(service.sendEmail).toHaveBeenCalled();
      expect(handleService.handleInvalidForm).not.toHaveBeenCalled();

      await service.sendDataForms(form.value);

      expect(handleService.handleSuccess).toHaveBeenCalledWith(form);
    });

  });

  describe('sendEmail integration', () => {
    it('should send email and handle success', async () => {
      const form: FormGroup = formBuilder.group({
        name: ['John Doe'],
        email: ['john.doe@example.com'],
      });

      service.contactForm = form;

      spyOn(service, 'sendDataForms').and.returnValue(Promise.resolve({ status: 200 } as any));
      spyOn(handleService, 'handleSuccess');

      await service.sendEmail();

      expect(service.sendDataForms).toHaveBeenCalledWith(form.value);
      expect(handleService.handleSuccess).toHaveBeenCalledWith(form);
    });
  });

  describe('sendDataForms integration', () => {
    it('should call emailjs.send with correct parameters', async () => {
      spyOn(emailjs, 'send').and.returnValue(Promise.resolve({ status: 200 } as any));

      const templateParams = { name: 'John Doe', email: 'john.doe@example.com' };

      await service.sendDataForms(templateParams);

      expect(emailjs.send).toHaveBeenCalledWith(
        environment.serviceId,
        environment.templateId,
        templateParams,
        environment.userId
      );
    });

    it('should handle emailjs.send rejection', async () => {
      spyOn(emailjs, 'send').and.returnValue(Promise.reject('Error'));

      try {
        await service.sendDataForms({ name: 'John Doe', email: 'john.doe@example.com' });
      } catch (error) {
        expect(error).toBe('Error');
      }
    });
  });
});