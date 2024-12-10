import { TestBed } from '@angular/core/testing';
import { FormStatusService } from '../FormStatus.service';
import { fakeAsync, tick } from '@angular/core/testing';

//NOTE: Unit Test
describe('FormStatusService - Unit Tests', () => {
  let service: FormStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormStatusService,
      ],
    });

    service = TestBed.inject(FormStatusService);
  });

  it('should be created', () => {
    // Test if the service is created correctly
    expect(service).toBeTruthy();
  });

  it('should set form status and emit formStatusChanged event', fakeAsync(() => {
    const status = { success: true, message: 'Form submitted successfully' };

    // Listen for the formStatusChanged event
    service.formStatusChanged.subscribe((status: any) => {
      // Validate that the event was emitted with the correct status
      expect(status).toEqual({ success: true, message: 'Form submitted successfully' });
    });

    // Set the form status and emit the event
    service.setFormStatus(status);
    tick(); // Simulate passage of time if necessary
  }));

  it('should clear form status after delay', fakeAsync(() => {
    const status = { success: true, message: 'Form submitted successfully' };

    // Set the form status first
    service.setFormStatus(status);

    // Call the method that clears the form status after delay
    service.clearFormStatusAfterDelay();

    // Simulate passage of 5 seconds (5000ms)
    tick(5000);

    // Listen for the formStatusChanged event and verify it is cleared
    service.formStatusChanged.subscribe((status: any) => {
      // Validate that the form status is cleared (i.e., null)
      expect(status).toBeNull();
    });
  }));

  it('should return the current form status', () => {
    const status = { success: true, message: 'Form submitted successfully' };

    // Set the form status
    service.setFormStatus(status);

    // Validate that the getFormStatus method returns the correct form status
    const currentStatus = service.getFormStatus();
    expect(currentStatus).toEqual(status);
  });

  it('should return null as initial form status', () => {
    const initialStatus = service.getFormStatus();
    expect(initialStatus).toBeNull();
  });

  it('should handle multiple setFormStatus calls', fakeAsync(() => {
    const status1 = { success: true, message: 'Form submitted successfully' };
    const status2 = { success: false, message: 'Form submission failed' };

    const emittedStatuses: any[] = [];
    service.formStatusChanged.subscribe((status: any) => {
      emittedStatuses.push(status);
      if (emittedStatuses.length === 2) {
        expect(emittedStatuses[0]).toEqual(status1);
        expect(emittedStatuses[1]).toEqual(status2);
      }
    });

    service.setFormStatus(status1);
    service.setFormStatus(status2);
    tick(); // Ensure all asynchronous actions are completed
  }));
});



//NOTE: Integration Tests
describe('FormStatusService - Integration Tests', () => {
  let service: FormStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormStatusService,
      ],
    });

    service = TestBed.inject(FormStatusService);
  });

  it('should update form status and emit the status change', fakeAsync(() => {
    const status = { success: true, message: 'Form submitted successfully' };

    service.formStatusChanged.subscribe((status: any) => {
      expect(status).toEqual({ success: true, message: 'Form submitted successfully' });
    });

    service.setFormStatus(status);
    tick(); // Simulate time passage if necessary
  }));

  it('should clear form status after delay and emit null', fakeAsync(() => {
    const status = { success: true, message: 'Form submitted successfully' };

    service.setFormStatus(status);
    service.clearFormStatusAfterDelay();

    service.formStatusChanged.subscribe((status: any) => {
      expect(status).toBeNull();
    });

    tick(5000); // Simulate 5 seconds
  }));

  it('should return the current form status correctly', () => {
    const status = { success: true, message: 'Form submitted successfully' };

    service.setFormStatus(status);
    const currentStatus = service.getFormStatus();
    expect(currentStatus).toEqual(status);
  });

  it('should emit formStatusChanged event when form status is updated multiple times', fakeAsync(() => {
    const status1 = { success: true, message: 'Form submitted successfully' };
    const status2 = { success: false, message: 'Form submission failed' };

    const emittedStatuses: any[] = [];
    service.formStatusChanged.subscribe((status: any) => {
      emittedStatuses.push(status);
      if (emittedStatuses.length === 2) {
        expect(emittedStatuses[0]).toEqual(status1);
        expect(emittedStatuses[1]).toEqual(status2);
      }
    });

    service.setFormStatus(status1);
    service.setFormStatus(status2);
    tick(); // Ensure all asynchronous actions are completed
  }));
});
