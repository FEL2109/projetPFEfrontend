import { Component } from '@angular/core';

@Component({
  selector: 'app-solde-conges',
  templateUrl: './solde-conges.component.html',
  styleUrls: ['./solde-conges.component.css']
})
export class SoldeCongesComponent {
  soldeAnnuel = 30;
  congesPris = 12;
  soldeRestant = 18;

  historiqueConges = [
    { annee: 2025, initial: 30, pris: 12, restant: 18 },
    { annee: 2024, initial: 30, pris: 28, restant: 2 },
    // ...
  ];

  calculateBusinessDays(start: Date, end: Date): number {
    let count = 0;
    let current = new Date(start);
    end = new Date(end);

    let includeSaturday = false;
    // Vérifie si la période contient un vendredi ou un lundi
    let temp = new Date(start);
    while (temp <= end) {
      if (temp.getDay() === 1 || temp.getDay() === 5) { // Lundi=1, Vendredi=5
        includeSaturday = true;
        break;
      }
      temp.setDate(temp.getDate() + 1);
    }

    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && (day !== 6 || includeSaturday)) { // Exclut dimanche, inclut samedi si règle OK
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    return count;
  }
}
