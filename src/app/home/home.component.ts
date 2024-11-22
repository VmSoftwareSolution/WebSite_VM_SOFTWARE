import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AboutComponent } from '../about/about.component';
import { ServiceComponent } from "../service/service.component";
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    'ngSkipHydration': 'true' //NOTE: this is for converting website from dynamic to dynamic, Angular does not take the control
  }
})
export default class HomeComponent {

}
