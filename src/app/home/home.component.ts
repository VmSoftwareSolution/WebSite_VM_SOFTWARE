import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { AboutComponent } from '../about/about.component';
import { ServiceComponent } from "../service/service.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    AboutComponent,
    ServiceComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {

}
