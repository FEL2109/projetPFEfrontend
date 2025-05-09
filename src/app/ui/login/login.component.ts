import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = ''; // Propriété pour le nom d'utilisateur
  password: string = ''; // Propriété pour le mot de passe
  hide: boolean = true; // Propriété pour basculer la visibilité du mot de passe
  rememberMe: boolean = false; // Propriété pour "Remember me"

  constructor(private authService: AuthService, private router: Router) {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit(): void {
    this.onLogin();
  }

  onLogin(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        const token = response.accessToken;
        this.authService.handleLoginSuccess(token);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}





