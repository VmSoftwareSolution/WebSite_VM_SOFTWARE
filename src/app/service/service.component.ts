import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  host: {
    'ngSkipHydration': 'true' //NOTE: this is for converting website from dynamic to dynamic, Angular does not take the control
  }
})
export class ServiceComponent {

}
