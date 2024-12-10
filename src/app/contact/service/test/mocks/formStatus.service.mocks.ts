import { EventEmitter } from '@angular/core';

// Mock FormStatusService
export const formStatusServiceMock = jasmine.createSpyObj('FormStatusService', [
  'getFormStatus',
  'setFormStatus',
  'clearFormStatusAfterDelay',
]);

export const formStatusChangedEmitter = new EventEmitter<{ success: boolean, message: string } | null>();
formStatusServiceMock.formStatusChanged = formStatusChangedEmitter; // Use the mock emitter for event emission.
