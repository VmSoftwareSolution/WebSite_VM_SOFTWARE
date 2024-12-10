
//Mock FormsStatusService
export const formStatusServiceMock = jasmine.createSpyObj('FormStatusService', [
    'setFormStatus',
    'clearFormStatusAfterDelay',
]);
  
//Mock FormGroup
export const formGroupMock = jasmine.createSpyObj('FormGroup', ['reset']);

//Mock the reset method to return nothing
formGroupMock.reset.and.returnValue(null);