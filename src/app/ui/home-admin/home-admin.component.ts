import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
constructor(private router: Router) {}

  logout(): void {
    // Supprimer les informations d'authentification (exemple : token)
    localStorage.removeItem('token');

    // Rediriger vers la page de connexion
    this.router.navigate(['/login']);
  }

  goToProfil(): void {
    this.router.navigate(['/home-admin/profil']);
  }
}
