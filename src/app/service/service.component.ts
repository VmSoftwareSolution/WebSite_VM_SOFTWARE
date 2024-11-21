import { Component } from '@angular/core';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  host: {
    'ngSkipHydration': 'true'
  }
})
export class ServiceComponent {

}
