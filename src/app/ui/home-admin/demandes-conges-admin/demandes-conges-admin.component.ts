import { Component } from '@angular/core';

interface LeaveRequest {
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'En attente' | 'Refusée' | 'Approuvée';
  comment: string;
  approver: string;
}

@Component({
  selector: 'app-demandes-conges-admin',
  templateUrl: './demandes-conges-admin.component.html',
  styleUrls: ['./demandes-conges-admin.component.css']
})
export class DemandesCongesAdminComponent {
 stats = [
    { value: 10, label: 'Demandes congés disponibles', color: '#E6F4EA' },
    { value: 2, label: 'Solde compensatoire', color: '#F1F9F6' },
    { value: 3, label: 'Demandes congés refusées', color: '#F8E7E8' },
    { value: 2, label: 'Demandes congés en attente', color: '#FFF8E1' }
  ];

  leaveRequests: LeaveRequest[] = [
    {
      type: 'Congé annuel',
      startDate: '31 Dec 2024',
      endDate: '10 Jan 2025',
      days: 1,
      status: 'En attente',
      comment: 'Commentaire....',
      approver: 'Avinash'
    },
    {
      type: 'Congé annuel',
      startDate: '31 Dec 2024',
      endDate: '31 Dec 2024',
      days: 2,
      status: 'Refusée',
      comment: 'Commentaire....',
      approver: 'Avinash'
    },
    {
      type: 'Congé maladie',
      startDate: '25 Dec 2024',
      endDate: '25 Dec 2024',
      days: 1,
      status: 'Approuvée',
      comment: 'Commentaire....',
      approver: 'Avinash'
    },
    {
      type: 'Congé annuel',
      startDate: '10 Dec 2024',
      endDate: '13 Dec 2024',
      days: 3,
      status: 'Approuvée',
      comment: 'Commentaire....',
      approver: 'Avinash'
    },
    {
      type: 'Congé maladie',
      startDate: '8 Nov 2024',
      endDate: '13 Nov 2024',
      days: 5,
      status: 'Approuvée',
      comment: 'Commentaire....',
      approver: 'Avinash'
    },
    {
      type: 'Congé annuel',
      startDate: '8 Nov 2024',
      endDate: '13 Nov 2024',
      days: 5,
      status: 'Approuvée',
      comment: 'Commentaire....',
      approver: 'Avinash'
    }
  ];

  selectedRequest: any = null;

  accepter(req: any) {
    // Votre logique d’acceptation ici
    req.status = 'Approuvée';
  }

  refuser(req: any) {
    // Votre logique de refus ici
    req.status = 'Refusée';
  }

  getStatusType(status: string): string {
    switch (status) {
      case 'En attente': return 'warning';
      case 'Refusée': return 'error';
      case 'Approuvée': return 'success';
      default: return '';
    }
  }


}