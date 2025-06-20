import { Component } from '@angular/core';

@Component({
  selector: 'app-mes-demandes-conges',
  templateUrl: './mes-demandes-conges.component.html',
  styleUrls: ['./mes-demandes-conges.component.css']
})
export class MesDemandesCongesComponent {
  demandes = [
    {
      dateDemande: new Date(2025, 5, 10),
      dateDebut: new Date(2025, 5, 20),
      dateFin: new Date(2025, 5, 25),
      typeConge: 'Congé payé',
      typeAbsence: null,
      statut: 'Approuvée',
      jours: 6
    },
    {
      dateDemande: new Date(2025, 3, 2),
      dateDebut: new Date(2025, 3, 10),
      dateFin: new Date(2025, 3, 12),
      typeConge: null,
      typeAbsence: 'Absence justifiée',
      statut: 'En attente',
      jours: 3
    },
    {
      dateDemande: new Date(2025, 0, 15),
      dateDebut: new Date(2025, 0, 20),
      dateFin: new Date(2025, 0, 22),
      typeConge: 'Congé sans solde',
      typeAbsence: null,
      statut: 'Refusée',
      jours: 3
    },
    {
      dateDemande: new Date(2025, 2, 5),
      dateDebut: new Date(2025, 2, 10),
      dateFin: new Date(2025, 2, 15),
      typeConge: null,
      typeAbsence: 'Arrêt maladie',
      statut: 'Approuvée',
      jours: 6
    },
    {
      dateDemande: new Date(2025, 4, 1),
      dateDebut: new Date(2025, 4, 10),
      dateFin: new Date(2025, 4, 12),
      typeConge: 'Congé maternité/paternité',
      typeAbsence: null,
      statut: 'En attente',
      jours: 3
    },
    {
      dateDemande: new Date(2025, 6, 18),
      dateDebut: new Date(2025, 6, 20),
      dateFin: new Date(2025, 6, 25),
      typeConge: null,
      typeAbsence: 'Absence non justifiée',
      statut: 'Refusée',
      jours: 6
    },
    {
      dateDemande: new Date(2025, 7, 10),
      dateDebut: new Date(2025, 7, 15),
      dateFin: new Date(2025, 7, 17),
      typeConge: null,
      typeAbsence: 'Absence pour formation',
      statut: 'Approuvée',
      jours: 3
    }
  ];

  getStatusColor(statut: string): string {
    switch (statut) {
      case 'Approuvée': return 'green';
      case 'Refusée': return 'red';
      case 'En attente': return 'gold';
      default: return 'blue';
    }
  }
}
