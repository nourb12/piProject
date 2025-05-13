import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LoginfrontService } from '../services/loginfront.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginfront',
  templateUrl: './loginfront.component.html',
  styleUrls: ['./loginfront.component.css']
})
export class LoginfrontComponent implements AfterViewInit {

  @ViewChild('container') container!: ElementRef;
  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;

  user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'STUDENT',
    secretKey: '' // ✅ Clé secrète ajoutée ici
  };

  loginRequest = {
    email: '',
    password: ''
  };

  roles: string[] = ['STUDENT', 'HR', 'INTERN', 'SUPERVISOR', 'ADMIN'];
  errorMessage: string = '';


  constructor(private loginService: LoginfrontService, private router: Router) {}

  ngAfterViewInit() {
    this.signUpButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add("right-panel-active");
    });

    this.signInButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove("right-panel-active");
    });
  }

  onRegister(event: Event) {
    event.preventDefault();

// ✅ Validation basique
if (this.user.role !== 'STUDENT' && !this.user.secretKey) {
  this.errorMessage = "Secret Key is required.";
  return;
}


    this.loginService.register(this.user).subscribe({
      next: (response) => {
        console.log("User registered successfully: ", response);
        alert("Registration successful!");
      },
      error: (err) => {
        console.error("Registration error: ", err);
        this.errorMessage = err.error.message || "Registration failed.";
      }
    });
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.loginService.authenticate(this.loginRequest).subscribe({
      next: (response) => {
        console.log("Login successful: ", response);
        localStorage.setItem('token', response.token); // Store JWT in localStorage

        // Check the user's role and redirect accordingly
        if (response.role === 'STUDENT') {
          this.router.navigate(['/front']); // Redirect to front if role is STUDENT
        } else {
          this.router.navigate(['/profile-back']); // Redirect to back office for other roles
        }
      },
      error: (err) => {
        console.error("Login error: ", err);
      }
    });
  }
}
