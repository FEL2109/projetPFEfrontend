import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {
  user: any = null;
  date: Date = new Date();
  notifications = [
    { text: "Votre demande de congé a été approuvée.", time: '2025-06-02' },
    { text: "Nouveau jour férié ajouté au calendrier.", time: '2025-06-01' },
    { text: "Rappel : solde de congés faible.", time: '2025-05-28' }
  ];
  showNotifications = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  goToProfil(): void {
    this.router.navigate(['/home-user/profil']);
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
}
