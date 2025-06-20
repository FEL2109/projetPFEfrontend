import { Component } from '@angular/core';

@Component({
  selector: 'app-soumettre-demande-conge',
  templateUrl: './soumettre-demande-conge.component.html',
  styleUrls: ['./soumettre-demande-conge.component.css']
})
export class SoumettreDemandeCongeComponent {
  comment: string = '';
  selectedFileName: string | null = null;
  jours: number[] = Array.from({ length: 30 }, (_, i) => i + 1); // Génère un tableau de 1 à 30
  selectedForm: 'conge' | 'absence' = 'conge';

  updateCharCount(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.comment = input.value;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    } else {
      this.selectedFileName = null;
    }
  }
}
