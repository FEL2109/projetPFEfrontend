import { Component } from '@angular/core';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent {
  user = {
    id: 'ISER001',
    nom: 'El Amrani',
    prenom: 'Lamia',
    email: 'lamia.elamrani@iser.ma',
    telephone: '+212 612345678',
    photoUrl: 'assets/images/photo-profil.jpg'
  };
}



