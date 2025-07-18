import { Component, OnInit } from '@angular/core';

interface HistoriqueItem {
  type: string;
  motif: string;
  debut: Date;
  fin: Date;
  statut: string;
}

@Component({
  selector: 'app-historique-personnel',
  templateUrl: './historique-personnel.component.html',
  styleUrls: ['./historique-personnel.component.css']
})
export class HistoriquePersonnelComponent implements OnInit {
  searchText = '';
  selectedType = '';
  selectedStatus = '';
  data: HistoriqueItem[] = [
    {
      type: 'Congé',
      motif: 'Vacances été',
      debut: new Date('2024-07-01'),
      fin: new Date('2024-07-10'),
      statut: 'Validé'
    },
    {
      type: 'Absence',
      motif: 'Maladie',
      debut: new Date('2024-06-15'),
      fin: new Date('2024-06-17'),
      statut: 'En attente'
    },
    {
      type: 'Congé',
      motif: 'Mariage',
      debut: new Date('2024-05-20'),
      fin: new Date('2024-05-22'),
      statut: 'Refusé'
    },
    {
      type: 'Absence Non Justifiée',
      motif: 'Non signalée',
      debut: new Date('2024-06-20'),
      fin: new Date('2024-06-20'),
      statut: 'Non justifiée'
    },
    {
      type: 'Retard',
      motif: 'Trafic',
      debut: new Date('2024-06-21T09:15:00'),
      fin: new Date('2024-06-21T09:30:00'),
      statut: 'Validé'
    }
  ];
  filteredData: HistoriqueItem[] = [];

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter() {
    this.filteredData = this.data.filter(item => {
      const matchesSearch = this.searchText
        ? (item.motif.toLowerCase().includes(this.searchText.toLowerCase()) ||
           item.type.toLowerCase().includes(this.searchText.toLowerCase()))
        : true;
      const matchesType = this.selectedType ? item.type === this.selectedType : true;
      const matchesStatus = this.selectedStatus ? item.statut === this.selectedStatus : true;
      return matchesSearch && matchesType && matchesStatus;
    });
    console.log(this.filteredData); // Ajoute ceci pour vérifier le contenu
  }

  getStatusColor(status: string, type?: string): string {
    switch (status) {
      case 'Validé': return 'success';
      case 'Refusé': return 'error';
      case 'En attente': return 'processing';
      case 'Non justifiée': return 'warning';
      default: return 'default';
    }
  }

  openDetail(item: HistoriqueItem) {
    alert(
      `Détail de la demande :\nType : ${item.type}\nMotif : ${item.motif}\nDu ${item.debut.toLocaleDateString()} au ${item.fin.toLocaleDateString()}\nStatut : ${item.statut}`
    );
  }

  exportExcel() {
    const separator = ',';
    const keys = ['type', 'motif', 'debut', 'fin', 'statut'];
    const header = ['Type', 'Motif', 'Début', 'Fin', 'Statut'];
    const csvRows = [
      header.join(separator),
      ...this.filteredData.map(item =>
        [
          item.type,
          item.motif,
          item.debut instanceof Date ? item.debut.toLocaleDateString() : item.debut,
          item.fin instanceof Date ? item.fin.toLocaleDateString() : item.fin,
          item.statut
        ].join(separator)
      )
    ];
    const csvContent = csvRows.join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'historique.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
