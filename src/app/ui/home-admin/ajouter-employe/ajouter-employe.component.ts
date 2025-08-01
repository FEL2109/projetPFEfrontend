import { Component } from '@angular/core';

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.css']
})
export class AjouterEmployeComponent {
  newEmp: any = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    poste: ''
  };

  addEmploye(): void {
    // À remplacer par un appel à un service pour l'enregistrement réel
    alert('Employé ajouté (démo) : ' + JSON.stringify(this.newEmp));
    // Réinitialiser le formulaire
    this.newEmp = { nom: '', prenom: '', email: '', motDePasse: '', telephone: '', poste: '' };
  }
}
