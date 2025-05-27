import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau-de-bord-user',
  templateUrl: './tableau-de-bord-user.component.html',
  styleUrls: ['./tableau-de-bord-user.component.css']
})
export class TableauDeBordUserComponent implements OnInit {
  // Propriétés pour le template
  soldeConges = 10;
  joursPris = 12;
  notifications = [
    { text: 'Nouvelle politique de congé disponible', time: 'il y a 2 heures' },
    { text: 'Votre demande a été approuvée', time: 'Hier' }
  ];
  date = new Date();
  isModalVisible = false;
  today = new Date();

  // Liste complète des congés/fêtes (exemple, à adapter selon l’année)
  allCongesMaroc = [
    { date: new Date(2025, 0, 1), label: 'Nouvel an' },
    { date: new Date(2025, 0, 11), label: 'Manifeste de l\'indépendance' },
    { date: new Date(2025, 0, 14), label: 'Nouvel an amazigh' },
    { date: new Date(2025, 4, 1), label: 'Fête du Travail' },
    { date: new Date(2025, 6, 30), label: 'Fête du trône' },
    { date: new Date(2025, 7, 14), label: 'Oued Eddahab' },
    { date: new Date(2025, 7, 20), label: 'Révolution du Roi et du peuple' },
    { date: new Date(2025, 7, 21), label: 'Fête de la jeunesse' },
    { date: new Date(2025, 10, 6), label: 'Marche verte' },
    { date: new Date(2025, 10, 18), label: 'Fête de l\'indépendance' },
    { date: new Date(2025, 2, 1), label: 'Aïd Al-Fitr' },
    { date: new Date(2025, 5, 7), label: 'Aïd Al-Adha' },
    { date: new Date(2025, 6, 27), label: 'Jour de l\'an hégire' },
    { date: new Date(2025, 8, 6), label: 'Aïd Al-Mawlid Annabawi' },
  ];

  congesAVenir: any[] = [];

  ngOnInit() {
    // Force la conversion en Date pour chaque congé
    this.allCongesMaroc = this.allCongesMaroc.map(c => ({
      ...c,
      date: c.date instanceof Date ? c.date : new Date(c.date)
    }));
    this.congesAVenir = this.getNextConges();
  }

  // Renvoie les deux prochains congés à venir
  getNextConges() {
    return this.allCongesMaroc
      .filter(c => c.date >= this.today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 2);
  }

  // Pour le point rouge dans le calendrier
  isCongeAVenir(date: Date): boolean {
    return this.allCongesMaroc.some(
      c => c.date.getDate() === date.getDate() &&
           c.date.getMonth() === date.getMonth() &&
           c.date.getFullYear() === date.getFullYear()
    );
  }

  // Pipe pour filtrer les congés à venir
  getAllCongesAVenir() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.allCongesMaroc
      .filter(c => {
        const congDate = new Date(c.date);
        congDate.setHours(0, 0, 0, 0);
        return congDate.getTime() >= today.getTime();
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  handleCancel(event?: Event): void {
    this.isModalVisible = false;
  }

  getCongeLabel(date: Date): string {
    const conge = this.allCongesMaroc.find(
      c => c.date.getDate() === date.getDate() &&
           c.date.getMonth() === date.getMonth() &&
           c.date.getFullYear() === date.getFullYear()
    );
    return conge ? conge.label : '';
  }
}

