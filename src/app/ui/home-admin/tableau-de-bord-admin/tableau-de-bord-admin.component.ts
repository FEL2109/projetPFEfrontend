
import { Component } from '@angular/core';

@Component({
  selector: 'app-tableau-de-bord-admin',
  templateUrl: './tableau-de-bord-admin.component.html',
  styleUrls: ['./tableau-de-bord-admin.component.css']
})
export class TableauDeBordAdminComponent {
  // Statistiques manager/admin (mock/demo)
  nombreEmployes = 12;
  absencesMois = 5;
  congesMois = 3;
  // Statistiques principales (mock/demo)
  soldeConges = 15;
  joursPris = 7;
  demandeCongeStatut: 'En attente' | 'Validée' | 'Refusée' = 'En attente';
  demandesEnAttente = 2;
  demandesStats = { total: 10, validees: 5, enAttente: 2, refusees: 3 };
  soldePrevu = 12;
  soldePrevuPercent = 60;
  tauxPresence = 95;
  tauxAbsEquipe = 5.1;
  notifications = [
    { text: "Votre demande de congé a été approuvée.", time: new Date(), type: 'success' },
    { text: "Nouveau jour férié ajouté au calendrier.", time: new Date(), type: 'info' }
  ];
  // Pour la section jours fériés/agenda
  nextHolidays = [
    { label: "Fête du Trône", date: new Date(2025, 6, 30) },
    { label: "Aïd Al Adha", date: new Date(2025, 5, 6) }
  ];
  holidayIndex = 0;
  date = new Date();
  // Pour les graphiques (mock/demo)
  absencesMoisData = [
    { name: 'Absences', series: [
      { name: 'Jan', value: 1 }, { name: 'Fév', value: 0 }, { name: 'Mar', value: 2 },
      { name: 'Avr', value: 1 }, { name: 'Mai', value: 3 }, { name: 'Juin', value: 2 },
      { name: 'Juil', value: 1 }, { name: 'Août', value: 0 }, { name: 'Sep', value: 2 },
      { name: 'Oct', value: 1 }, { name: 'Nov', value: 0 }, { name: 'Déc', value: 1 }
    ]}
  ];
  congesPieData = [
    { name: 'Congé payé', value: 5 },
    { name: 'Sans solde', value: 1 }
  ];
  colorScheme: string = 'vivid'; // Utilise un nom de palette ngx-charts compatible

  // --- Ajout employé (modal) ---
  isAddEmployeModalVisible = false;
  newEmploye = {
    username: '',
    password: '',
    nom: '',
    prenom: '',
    email: '',
    role: '',
    telephone: ''
  };

  openAddEmployeModal() {
    this.isAddEmployeModalVisible = true;
  }

  handleCancelAddEmploye() {
    this.isAddEmployeModalVisible = false;
    this.resetAddEmployeForm();
  }

  submitAddEmploye() {
    // Ici, vous pouvez appeler un service pour ajouter l'employé (API)
    // Pour la démo, on ferme juste la modal et on reset le formulaire
    this.isAddEmployeModalVisible = false;
    this.resetAddEmployeForm();
    // Optionnel : afficher une notification de succès
    // this.notifications.unshift({ text: 'Nouvel employé ajouté !', time: new Date(), type: 'success' });
  }

  resetAddEmployeForm() {
    this.newEmploye = {
      username: '',
      password: '',
      nom: '',
      prenom: '',
      email: '',
      role: '',
      telephone: ''
    };
  }

  prevHoliday() {
    if (this.nextHolidays.length) {
      this.holidayIndex = (this.holidayIndex - 1 + this.nextHolidays.length) % this.nextHolidays.length;
    }
  }
  nextHoliday() {
    if (this.nextHolidays.length) {
      this.holidayIndex = (this.holidayIndex + 1) % this.nextHolidays.length;
    }
  }

  // Couleurs fixes pour la légende du camembert
  pieColors: string[] = ['#34c759', '#ffc300', '#3a5fc8', '#e53935'];
  getPieColor(index: number): string {
    return this.pieColors[index % this.pieColors.length];
  }
}
