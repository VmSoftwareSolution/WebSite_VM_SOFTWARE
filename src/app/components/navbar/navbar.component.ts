import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  activeSection: string = '';
  public isMenuOpen: boolean = false; 

  //NOTE: This method is for opening or closing menu button on movil 
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  //NOTE: This method is for scrolling up or down through modules
  scrollTo(sectionId: string): void {
    //Getting the element with id request
    const element = document.getElementById(sectionId);
    if (element) {// if the element is not empty or null then continue
      element.scrollIntoView(
        {
          behavior: 'smooth', //the movement down or up is gentle
          block: 'start' //aligning the element with the top part of the view
        }
      );
      this.activeSection = sectionId;
    }
  }
}
