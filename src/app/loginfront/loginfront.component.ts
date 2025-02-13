import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loginfront',
  templateUrl: './loginfront.component.html',
  styleUrls: ['./loginfront.component.css']
})
export class LoginfrontComponent implements AfterViewInit{

  @ViewChild('container') container!: ElementRef;
  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;

  ngAfterViewInit() {
 

    this.signUpButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add("right-panel-active");
      localStorage.setItem('panel', 'signup'); // Sauvegarde l'état
    });

    this.signInButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove("right-panel-active");
      localStorage.setItem('panel', 'signin'); // Sauvegarde l'état
    });
  }

}
