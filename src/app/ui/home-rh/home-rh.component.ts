import { Component } from '@angular/core';

@Component({
  selector: 'app-home-rh',
  templateUrl: './home-rh.component.html',
  styleUrls: ['./home-rh.component.css']
})
export class HomeRhComponent {

  logout() {
    // Déconnexion basique : suppression du token et redirection
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

}
