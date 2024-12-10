
// Mocks para HandleService
export const handleServiceMock = jasmine.createSpyObj('HandleService', ['handleInvalidForm', 'handleSuccess', 'handleError']);

// Mock para emailjs
export const emailjsMock = {
  send: jasmine.createSpy('send').and.returnValue(Promise.resolve({ status: 200, text: 'OK' }))
};