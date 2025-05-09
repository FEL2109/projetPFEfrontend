import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Supprimer les informations d'authentification (exemple : token)
    localStorage.removeItem('token');

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }
}
