import { Component, ViewChild } from '@angular/core';
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

  //Creating a "nav" variable of type "NavbarComponent" and using the "viewChild" decorator to get an instance of NavbarComponent 
  @ViewChild(NavbarComponent) nav!: NavbarComponent;

  //NOTE: this method is for scrolling up or down through the components
  scrollToSection(id: string) {
    this.nav.scrollTo(id); //calling the "scrollTo" method of the NavbarComponent
  }
}
