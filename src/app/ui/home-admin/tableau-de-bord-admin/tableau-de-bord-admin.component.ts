import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableau-de-bord-admin',
  templateUrl: './tableau-de-bord-admin.component.html',
  styleUrls: ['./tableau-de-bord-admin.component.css']
})
export class TableauDeBordAdminComponent implements OnInit {
  soldeConges = 10; // À adapter pour le manager
  joursPris = 12;   // À adapter pour le manager
  notifications = [
    { text: "Un employé a soumis une nouvelle demande de congé.", time: new Date() },
    { text: "Nouveau jour férié ajouté au calendrier.", time: new Date() }
  ];
  date = new Date();
  today = new Date();

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

  nextHolidays: any[] = [];
  holidayIndex = 0;

  ngOnInit() {
    this.nextHolidays = this.getNextHolidays();
  }

  getNextHolidays(count = 3) {
    const today = new Date();
    return this.allHolidays2025
      .filter(j => j.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, count);
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
