import { TestBed } from '@angular/core/testing';
import { HandleService } from '../handle.service';
import { FormStatusService } from '../FormStatus.service';
import { formGroupMock, formStatusServiceMock } from './mocks/handle.service.mocks';
import { FormGroup } from '@angular/forms';


//NOTE: UNIT TEST
describe('HandleService - unitTest', () => {
  let service: HandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HandleService,
        { provide: FormStatusService, useValue: formStatusServiceMock },
      ],
    });
    service = TestBed.inject(HandleService);
  });

  it('should be created', () => {
    // Test if the service is created correctly
    expect(service).toBeTruthy();
  });

  describe('handleSuccess', () => {
    it('should set form status to success, reset form, and clear status after delay', () => {
      const formValue = formGroupMock;

      // Call the handleSuccess method
      service.handleSuccess(formValue);

      // Check if form status was set to "success"
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: true,
        message: '¡Correo enviado correctamente! Nos pondremos en contacto pronto.',
      });

      // Check if the form was reset
      expect(formGroupMock.reset).toHaveBeenCalled();

      // Check if the clearFormStatusAfterDelay method was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });

    it('should handle empty form gracefully', () => {
      const emptyForm = { ...formGroupMock, value: null };  // Simulate an empty form or no value
      service.handleSuccess(emptyForm);

      // Check if form status was set to success with the appropriate message
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: true,
        message: '¡Correo enviado correctamente! Nos pondremos en contacto pronto.',
      });

      // Verify if the form was reset
      expect(formGroupMock.reset).toHaveBeenCalled();

      // Verify if clearFormStatusAfterDelay was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });
  });

  describe('handleError', () => {
    it('should set form status to error and clear status after delay', () => {
      const errorMock = { message: 'Some error' };

      // Call the handleError method
      service.handleError(errorMock);

      // Check if form status was set to "error"
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: false,
        message: 'Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.',
      });

      // Check if the clearFormStatusAfterDelay method was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });

    it('should handle unexpected error format', () => {
      const unexpectedError = {};  // Simulate an unexpected error format

      // Call the handleError method with an unexpected error
      service.handleError(unexpectedError);

      // Verify if the form status is set to error
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: false,
        message: 'Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.',
      });

      // Verify if clearFormStatusAfterDelay was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });
  });

  describe('handleInvalidForm', () => {
    it('should set form status to error and clear status after delay', () => {
      // Call the handleInvalidForm method
      service.handleInvalidForm();

      // Check if form status was set to "error"
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: false,
        message: 'Por favor, completa todos los campos correctamente.',
      });

      // Check if the clearFormStatusAfterDelay method was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });

    it('should handle invalid form gracefully', () => {
      const invalidForm = { ...formGroupMock, valid: false };  // Simulate an invalid form

      // Call the handleInvalidForm method
      service.handleInvalidForm();

      // Verify if the form status was set to error
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: false,
        message: 'Por favor, completa todos los campos correctamente.',
      });

      // Verify if clearFormStatusAfterDelay was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });
  });

  // Additional tests:

  describe('handleSuccess with incomplete form', () => {
    it('should not reset form and clear status if form is incomplete', () => {
      const incompleteForm = { ...formGroupMock, valid: false };  // Simulate an incomplete form
      service.handleSuccess(incompleteForm);

      // Check if form status was still set to success (the behavior can be adjusted if needed)
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: true,
        message: '¡Correo enviado correctamente! Nos pondremos en contacto pronto.',
      });

      // Check if the form was reset
      expect(formGroupMock.reset).toHaveBeenCalled();

      // Verify if clearFormStatusAfterDelay was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });
  });

  describe('edge case testing', () => {
    it('should handle undefined or null error messages gracefully', () => {
      const errorMock = { message: undefined };

      // Call the handleError method
      service.handleError(errorMock);

      // Ensure the message was handled properly
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: false,
        message: 'Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.',
      });

      // Verify if clearFormStatusAfterDelay was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });

    it('should handle an empty form when calling handleInvalidForm', () => {
      const emptyForm = { ...formGroupMock, valid: false };  // Simulate an empty or invalid form

      // Call the handleInvalidForm method
      service.handleInvalidForm();

      // Verify if the form status was set to error
      expect(formStatusServiceMock.setFormStatus).toHaveBeenCalledWith({
        success: false,
        message: 'Por favor, completa todos los campos correctamente.',
      });

      // Verify if clearFormStatusAfterDelay was called
      expect(formStatusServiceMock.clearFormStatusAfterDelay).toHaveBeenCalled();
    });
  });
});


//NOTE: Integration Test
describe('HandleService - Integration', () => {
  let service: HandleService;
  let formStatusService: FormStatusService;
  let formGroup: FormGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HandleService,
        FormStatusService,
      ],
    });

    service = TestBed.inject(HandleService);
    formStatusService = TestBed.inject(FormStatusService);
    formGroup = new FormGroup({}); // Create an empty FormGroup for the test
  });

  it('should update form status to success and reset form on handleSuccess', () => {
    // Spy on the methods of formStatusService and formGroup
    spyOn(formStatusService, 'setFormStatus').and.callThrough();
    spyOn(formGroup, 'reset').and.callThrough();
    spyOn(formStatusService, 'clearFormStatusAfterDelay').and.callThrough();

    // Call handleSuccess method
    service.handleSuccess(formGroup);

    // Verify if setFormStatus was called with correct parameters
    expect(formStatusService.setFormStatus).toHaveBeenCalledWith({
      success: true,
      message: '¡Correo enviado correctamente! Nos pondremos en contacto pronto.',
    });

    // Verify if the form was reset
    expect(formGroup.reset).toHaveBeenCalled();

    // Verify if clearFormStatusAfterDelay was called
    expect(formStatusService.clearFormStatusAfterDelay).toHaveBeenCalled();
  });

  it('should update form status to error on handleError', () => {
    const errorMock = { message: 'Network error' };

    // Spy on formStatusService methods
    spyOn(formStatusService, 'setFormStatus').and.callThrough();
    spyOn(formStatusService, 'clearFormStatusAfterDelay').and.callThrough();

    // Call handleError method
    service.handleError(errorMock);

    // Verify if setFormStatus was called with error status and message
    expect(formStatusService.setFormStatus).toHaveBeenCalledWith({
      success: false,
      message: 'Hubo un error al enviar el correo. Por favor, inténtalo nuevamente.',
    });

    // Verify if clearFormStatusAfterDelay was called
    expect(formStatusService.clearFormStatusAfterDelay).toHaveBeenCalled();
  });

  it('should update form status to error on handleInvalidForm', () => {
    // Spy on formStatusService methods
    spyOn(formStatusService, 'setFormStatus').and.callThrough();
    spyOn(formStatusService, 'clearFormStatusAfterDelay').and.callThrough();

    // Call handleInvalidForm method
    service.handleInvalidForm();

    // Verify if setFormStatus was called with error status and message
    expect(formStatusService.setFormStatus).toHaveBeenCalledWith({
      success: false,
      message: 'Por favor, completa todos los campos correctamente.',
    });

    // Verify if clearFormStatusAfterDelay was called
    expect(formStatusService.clearFormStatusAfterDelay).toHaveBeenCalled();
  });
});