import { Component } from '@angular/core';

@Component({
  selector: 'app-solde-conges',
  templateUrl: './solde-conges.component.html',
  styleUrls: ['./solde-conges.component.css']
})
export class SoldeCongesComponent {
  soldeAnnuel = 18;
  congesPris = 12;
  soldeRestant = 18 - 12;

  historiqueConges = [
    { annee: 2025, initial: 18, pris: 12, restant: 6 },
    { annee: 2024, initial: 18, pris: 18, restant: 0 },
    { annee: 2023, initial: 18, pris: 10, restant: 8 },
    { annee: 2022, initial: 18, pris: 18, restant: 0 },
  ].map(ligne => ({
    ...ligne,
    perime: this.isPerime(ligne.annee)
  }));

  /**
   * Un reliquat est périmé si l'année est plus de 2 ans avant l'année courante
   */
  isPerime(annee: number): boolean {
    const currentYear = new Date().getFullYear();
    return (currentYear - annee) > 1;
  }

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
