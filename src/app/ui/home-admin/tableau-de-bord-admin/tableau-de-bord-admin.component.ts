import { Component } from '@angular/core';

@Component({
  selector: 'app-tableau-de-bord-admin',
  templateUrl: './tableau-de-bord-admin.component.html',
  styleUrls: ['./tableau-de-bord-admin.component.css']
})
export class TableauDeBordAdminComponent {
 date: Date = new Date();

 holidays: { [key: string]: string } = {
  '2025-01-01': 'Nouvel An',
  '2025-01-11': 'Manifeste de l’Indépendance',
  '2025-01-14': 'Nouvel An Amazigh',
  '2025-05-01': 'Fête du Travail',
  '2025-07-30': 'Fête du Trône',
  '2025-08-14': 'Récupération de Oued Eddahab',
  '2025-08-20': 'Révolution du Roi et du Peuple',
  '2025-08-21': 'Fête de la Jeunesse',
  '2025-11-06': 'Marche Verte',
  '2025-11-18': 'Fête de l’Indépendance',
  '2025-03-31': 'Aïd Al Fitr',
  '2025-06-07': 'Aïd Al Adha',
  '2025-06-27': '1er Moharram',
  '2025-09-05': 'Aïd Al Mawlid'
};

 getHoliday(date: Date): string | null {
    const key = date.toISOString().split('T')[0]; // Format de date au format "YYYY-MM-DD"
    return this.holidays[key] || null; // Récupère le nom de la fête ou retourne null si pas de fête
  }
}
