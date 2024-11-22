import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  host: {
    'ngSkipHydration': 'true' //NOTE: this is for converting website from dynamic to dynamic, Angular does not take the control
  }
})
export class AboutComponent {

}
