import { Component, OnInit } from '@angular/core';
import { DemandeCongeService } from '../../../services/demamdeConge.service';
import { AbsenceService } from '../../../services/absence.service';

@Component({
  selector: 'app-mes-demandes-conges',
  templateUrl: './mes-demandes-conges.component.html',
  styleUrls: ['./mes-demandes-conges.component.css']
})
export class MesDemandesCongesComponent implements OnInit {
  demandesConges: any[] = [];
  absences: any[] = [];
  activeTab: 'conges' | 'absences' = 'conges';
  loading = false;
  resumeConges = { total: 0, approuvees: 0, enAttente: 0, refusees: 0 };
  resumeAbsences = { total: 0, approuvees: 0, enAttente: 0, refusees: 0 };

  constructor(
    private demandeCongeService: DemandeCongeService,
    private absenceService: AbsenceService
  ) {}

  ngOnInit() {
    this.loadDemandesConges();
    this.loadAbsences();
  }

  loadDemandesConges() {
    this.loading = true;
    this.demandeCongeService.getAllDemandes().subscribe({
      next: (data) => {
        this.demandesConges = data;
        this.setResumeConges();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des demandes de congés:', error);
        this.loading = false;
        // Données de fallback pour les tests
        this.demandesConges = this.getTestDemandesConges();
        this.setResumeConges();
      }
    });
  }

  setResumeConges() {
    const demandes = this.demandesConges || [];
    // Correction : prendre en compte la casse et les accents, et tous les statuts possibles
    this.resumeConges.total = demandes.length;
    this.resumeConges.approuvees = demandes.filter(d => (d.statut || '').toLowerCase().replace(/é/g, 'e').includes('approuve') || (d.statut || '').toLowerCase().replace(/é/g, 'e').includes('valide')).length;
    this.resumeConges.enAttente = demandes.filter(d => (d.statut || '').toLowerCase().includes('attente')).length;
    this.resumeConges.refusees = demandes.filter(d => (d.statut || '').toLowerCase().replace(/é/g, 'e').includes('refuse')).length;
  }

  loadAbsences() {
    this.absenceService.getAllAbsences().subscribe({
      next: (data) => {
        this.absences = data;
        this.setResumeAbsences();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des absences:', error);
        // Données de fallback pour les tests
        this.absences = this.getTestAbsences();
        this.setResumeAbsences();
      }
    });
  }

  setResumeAbsences() {
    const absences = this.absences || [];
    this.resumeAbsences.total = absences.length;
    this.resumeAbsences.approuvees = absences.filter(a => (a.statut || '').toLowerCase().replace(/é/g, 'e').includes('approuve') || (a.statut || '').toLowerCase().replace(/é/g, 'e').includes('valide')).length;
    this.resumeAbsences.enAttente = absences.filter(a => (a.statut || '').toLowerCase().includes('attente')).length;
    this.resumeAbsences.refusees = absences.filter(a => (a.statut || '').toLowerCase().replace(/é/g, 'e').includes('refuse')).length;
  }

  getTestAbsences() {
    return [
      {
        dateDemande: new Date(2025, 2, 5),
        dateDebut: new Date(2025, 2, 10),
        dateFin: new Date(2025, 2, 12),
        typeAbsence: 'Absence maladie',
        statut: 'Approuvée',
        jours: 3
      },
      {
        dateDemande: new Date(2025, 3, 1),
        dateDebut: new Date(2025, 3, 2),
        dateFin: new Date(2025, 3, 2),
        typeAbsence: 'Absence injustifiée',
        statut: 'Refusée',
        jours: 1
      },
      {
        dateDemande: new Date(2025, 4, 15),
        dateDebut: new Date(2025, 4, 16),
        dateFin: new Date(2025, 4, 17),
        typeAbsence: 'Absence autorisée',
        statut: 'En attente',
        jours: 2
      }
    ];
  }

  setActiveTab(tab: 'conges' | 'absences') {
    this.activeTab = tab;
  }

  getTestDemandesConges() {
    return [
      {
        dateDemande: new Date(2025, 5, 10),
        dateDebut: new Date(2025, 5, 20),
        dateFin: new Date(2025, 5, 25),
        typeConge: 'Congé payé',
        statut: 'Approuvée',
        jours: 6
      },
      {
        dateDemande: new Date(2025, 0, 15),
        dateDebut: new Date(2025, 0, 20),
        dateFin: new Date(2025, 0, 22),
        typeConge: 'Congé sans solde',
        statut: 'Refusée',
        jours: 3
      },
      {
        dateDemande: new Date(2025, 4, 1),
        dateDebut: new Date(2025, 4, 10),
        dateFin: new Date(2025, 4, 12),
        typeConge: 'Congé maternité/paternité',
        statut: 'En attente',
        jours: 3
      }
    ];
  }

 

  getStatusColor(statut: string): string {
    switch (statut) {
      case 'Approuvée': return 'green';
      case 'Refusée': return 'red';
      case 'En attente': return 'gold';
      default: return 'blue';
    }
  }
}