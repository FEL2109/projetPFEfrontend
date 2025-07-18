import { Component, OnInit } from '@angular/core';
import { DemandeCongeService } from '../../../services/demamdeConge.service';
@Component({
  selector: 'app-demandes-conges-admin',
  templateUrl: './demandes-conges-admin.component.html',
  styleUrls: ['./demandes-conges-admin.component.css']
})
export class DemandesCongesAdminComponent implements OnInit {

  demandes: any[] = [];
  leaveRequests: any[] = []; // liste filtrée affichée dans le tableau
  loading: boolean = true;
  errorMessage: string | null = null;

  filter = {
    type: '',
    status: '',
    startDate: null as Date | null
  };

  stats = [
    { label: 'Total demandes', value: 0 },
    { label: 'En attente', value: 0 },
    { label: 'Approuvées', value: 0 },
    { label: 'Refusées', value: 0 }
  ];

  constructor(private demandeCongeService: DemandeCongeService) {}

  ngOnInit(): void {
    this.fetchDemandes();
  }

  fetchDemandes(): void {
    this.loading = true;
    this.errorMessage = null;
    this.demandeCongeService.getAllDemandes().subscribe({
      next: (data) => {
        // Transformation des données reçues pour correspondre au template
        this.demandes = data.map((d: any) => ({
          id: d.idDemande,
          type: this.mapTypeCongeIdToString(d.typeCongeId),
          startDate: d.dateDebut,
          endDate: this.calculateEndDate(d.dateDebut, d.nombreJours),
          days: d.nombreJours,
          status: this.mapStatutToLabel(d.statut),
          comment: d.commentaire,
          approver: this.getApproverName(d.managerId) // Retourne null ou nom si disponible
        }));
        this.updateStats();
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des demandes de congé', err);
        this.errorMessage = `Erreur ${err.status}: ${err.message}`;
        this.loading = false;
      }
    });
  }

  mapTypeCongeIdToString(typeCongeId: number): string {
    switch(typeCongeId) {
      case 1: return 'Congé annuel';
      case 2: return 'Congé maladie';
      // Ajoute d'autres mappings si nécessaire
      default: return 'Autre';
    }
  }

  calculateEndDate(startDate: string, days: number): string {
    const start = new Date(startDate);
    start.setDate(start.getDate() + days - 1);
    return start.toISOString().split('T')[0]; // format YYYY-MM-DD
  }

  mapStatutToLabel(statut: string): string {
    switch(statut) {
      case 'EnAttente': return 'En attente';
      case 'Approuvee': return 'Approuvées';
      case 'Refusee': return 'Refusées';
      default: return statut;
    }
  }

  getApproverName(managerId: number): string | null {
    // TODO: si tu as une liste des managers/employés, cherche ici le nom
    // Sinon retourne null pour ne rien afficher
    return null;
  }

  updateStats(): void {
    this.stats[0].value = this.demandes.length;
    this.stats[1].value = this.demandes.filter(d => d.status === 'En attente').length;
    this.stats[2].value = this.demandes.filter(d => d.status === 'Approuvées').length;
    this.stats[3].value = this.demandes.filter(d => d.status === 'Refusées').length;
  }

  applyFilter(): void {
    this.leaveRequests = this.demandes.filter(req => {
      let match = true;
      if (this.filter.type && req.type !== this.filter.type) match = false;
      if (this.filter.status && req.status !== this.filter.status) match = false;
      if (this.filter.startDate) {
        const reqDate = new Date(req.startDate);
        const filterDate = new Date(this.filter.startDate);
        filterDate.setHours(0, 0, 0, 0);
        reqDate.setHours(0, 0, 0, 0);
        if (reqDate < filterDate) match = false;
      }
      return match;
    });
  }

  resetFilter(): void {
    this.filter = { type: '', status: '', startDate: null };
    this.applyFilter();
  }

  getStatusType(status: string): string {
    switch (status) {
      case 'En attente': return 'processing';
      case 'Approuvées': return 'success';
      case 'Refusées': return 'error';
      default: return 'default';
    }
  }

  accepter(req: any): void {
    this.loading = true;
    this.demandeCongeService.accepterDemande(req.id).subscribe({
      next: (response) => {
        this.fetchDemandes();
      },
      error: (err) => {
        this.errorMessage = `Erreur lors de l'approbation: ${err.status}`;
        this.loading = false;
      }
    });
  }

  refuser(req: any): void {
    this.loading = true;
    this.demandeCongeService.refuserDemande(req.id).subscribe({
      next: (response) => {
        this.fetchDemandes();
      },
      error: (err) => {
        this.errorMessage = `Erreur lors du refus: ${err.status}`;
        this.loading = false;
      }
    });
  }

}
