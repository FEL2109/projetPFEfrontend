import { Component } from '@angular/core';

interface Holiday {
  name: string;
  date: Date;
  type: 'national' | 'religious';
}

@Component({
  selector: 'app-calendrier-jours-officiels',
  templateUrl: './calendrier-jours-officiels.component.html',
  styleUrls: ['./calendrier-jours-officiels.component.css']
})
export class CalendrierJoursOfficielsComponent {
  currentYear = new Date().getFullYear();
  months = Array(12).fill(0);
  monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  dayShorts = ['L', 'Ma', 'Me', 'J', 'V', 'S', 'D'];

  nationalHolidays: Holiday[] = [
    { name: 'Nouvel An', date: new Date(this.currentYear, 0, 1), type: 'national' },
    { name: 'Manifeste de l\'Indépendance', date: new Date(this.currentYear, 0, 11), type: 'national' },
    { name: 'Fête du Travail', date: new Date(this.currentYear, 4, 1), type: 'national' },
    { name: 'Fête du Trône', date: new Date(this.currentYear, 6, 30), type: 'national' },
    { name: 'Fête de la Jeunesse', date: new Date(this.currentYear, 7, 21), type: 'national' },
    { name: 'Révolution du Roi et du Peuple', date: new Date(this.currentYear, 7, 20), type: 'national' },
    { name: 'Marche Verte', date: new Date(this.currentYear, 10, 6), type: 'national' },
    { name: 'Fête de l\'Indépendance', date: new Date(this.currentYear, 10, 18), type: 'national' }
  ];

  religiousHolidays: Holiday[] = [
    { name: 'Aïd al-Fitr – 1er jour', date: new Date(this.currentYear, 2, 31), type: 'religious' },
    { name: 'Aïd al-Fitr – 2e jour', date: new Date(this.currentYear, 3, 1), type: 'religious' },
    { name: 'Aïd al-Adha – 1er jour', date: new Date(this.currentYear, 5, 7), type: 'religious' },
    { name: 'Aïd al-Adha – 2e jour', date: new Date(this.currentYear, 5, 8), type: 'religious' },
    { name: '1er Moharram', date: new Date(this.currentYear, 6, 27), type: 'religious' },
    { name: 'Aïd al-Mawlid', date: new Date(this.currentYear, 8, 5), type: 'religious' }
  ];

  isHoliday(date: Date | null): boolean {
    if (!date) return false;
    return this.nationalHolidays.concat(this.religiousHolidays)
      .some(h => h.date.getDate() === date.getDate() &&
                 h.date.getMonth() === date.getMonth() &&
                 h.date.getFullYear() === date.getFullYear());
  }

  getMonthWeeks(month: number): (number | null)[][] {
    const year = this.currentYear;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];
    let dayOfWeek = (firstDay.getDay() + 6) % 7; // Lundi=0, Dimanche=6

    // Remplir les jours vides avant le 1er du mois
    for (let i = 0; i < dayOfWeek; i++) week.push(null);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    // Compléter la dernière semaine
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
    return weeks;
  }

  getDate(year: number, month: number, day: number | null): Date | null {
    if (!day) return null;
    return new Date(year, month, day);
  }
}