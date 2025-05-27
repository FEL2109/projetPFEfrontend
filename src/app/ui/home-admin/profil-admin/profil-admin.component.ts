import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent {
  id = 'EMP001';
  nom = 'Doe';
  prenom = 'John';
  email = 'john.doe@example.com';
  telephone = '+212 600000000';
  photoUrl: string = 'assets/images/photo-profil.jpg'; // ou null pour l’icône par défaut
}
