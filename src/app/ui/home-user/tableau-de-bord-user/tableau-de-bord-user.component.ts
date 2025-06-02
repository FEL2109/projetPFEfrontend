import { Component, OnInit } from '@angular/core';
import { ScaleType } from '@swimlane/ngx-charts';

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
    { text: "Votre demande de congé a été approuvée.", time: new Date() },
    { text: "Nouveau jour férié ajouté au calendrier.", time: new Date() }
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

  // Liste complète des jours fériés et fêtes religieuses du Maroc 2025
  allHolidays2025 = [
    { label: "Nouvel An", date: new Date(2025, 0, 1) },
    { label: "Anniversaire du Manifeste de l’Indépendance", date: new Date(2025, 0, 11) },
    { label: "Nouvel An Amazigh", date: new Date(2025, 0, 14) },
    { label: "Fête du Travail", date: new Date(2025, 4, 1) },
    { label: "Aïd Al Fitr (fin du Ramadan)", date: new Date(2025, 2, 31) },
    { label: "Fête du Trône", date: new Date(2025, 6, 30) },
    { label: "Anniversaire de la Récupération de Oued Eddahab", date: new Date(2025, 7, 14) },
    { label: "Révolution du Roi et du Peuple", date: new Date(2025, 7, 20) },
    { label: "Fête de la Jeunesse", date: new Date(2025, 7, 21) },
    { label: "Aïd Al Adha (fête du sacrifice)", date: new Date(2025, 5, 6) },
    { label: "1er Moharram (Nouvel An Hégirien)", date: new Date(2025, 5, 27) },
    { label: "Anniversaire de la Marche Verte", date: new Date(2025, 10, 6) },
    { label: "Aïd Al Mawlid (naissance du Prophète)", date: new Date(2025, 8, 5) },
    { label: "Fête de l’Indépendance", date: new Date(2025, 10, 18) }
  ];

  congesAVenir: any[] = [];
  nextHolidays: any[] = [];
  holidayIndex = 0;

  chartData = [
    { name: 'Lun', value: 6.6 },
    { name: 'Mar', value: 8 },
    { name: 'Mer', value: 8 },
    { name: 'Jeu', value: 8 },
    { name: 'Ven', value: 6 }
  ];

  colorScheme = {
    domain: ['#22336b', '#ffc300', '#34c759'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal // Ajoute cette ligne
  };

  ngOnInit() {
    // Force la conversion en Date pour chaque congé
    this.allCongesMaroc = this.allCongesMaroc.map(c => ({
      ...c,
      date: c.date instanceof Date ? c.date : new Date(c.date)
    }));
    this.congesAVenir = this.getNextConges();
    this.nextHolidays = this.getNextHolidays();
  }

  // Renvoie les deux prochains congés à venir
  getNextConges() {
    return this.allCongesMaroc
      .filter(c => c.date >= this.today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 2);
  }

  // Méthode pour obtenir les 3 prochains jours fériés/fêtes religieuses
  getNextHolidays(count = 3) {
    const today = new Date();
    return this.allHolidays2025
      .filter(j => j.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, count);
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

  nextHoliday() {
    if (this.nextHolidays.length) {
      this.holidayIndex = (this.holidayIndex + 1) % this.nextHolidays.length;
    }
  }

  prevHoliday() {
    if (this.nextHolidays.length) {
      this.holidayIndex =
        (this.holidayIndex - 1 + this.nextHolidays.length) % this.nextHolidays.length;
    }
  }
}

