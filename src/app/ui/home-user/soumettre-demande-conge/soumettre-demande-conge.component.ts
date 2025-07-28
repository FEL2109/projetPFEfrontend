import { Component } from '@angular/core';
import { DemandeCongeService } from '../../../services/demamdeConge.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AbsenceService } from 'src/app/services/absence.service';

@Component({
  selector: 'app-soumettre-demande-conge',
  templateUrl: './soumettre-demande-conge.component.html',
  styleUrls: ['./soumettre-demande-conge.component.css']
})
export class SoumettreDemandeCongeComponent {
  comment: string = '';
  selectedFileName: string | null = null;
  selectedFile: File | null = null;
  jours: number[] = Array.from({ length: 30 }, (_, i) => i + 1); // Génère un tableau de 1 à 30
  selectedForm: 'conge' | 'absence' = 'conge';
  
  // Propriétés pour le formulaire de congé
  typeConge: string = '';
  nombreJours: number | null = null;
  dateDebut: Date | null = null;
  dateFin: Date | null = null;
  
  // Propriétés pour le formulaire d'absence
  typeAbsence: string = '';

  constructor(
    private demandeCongeService: DemandeCongeService,
    private absenceService: AbsenceService,
    private message: NzMessageService
  ) {}

  updateCharCount(event: Event): void {
    const input = event.target as HTMLTextAreaElement;
    this.comment = input.value;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = input.files[0].name;
    } else {
      this.selectedFile = null;
      this.selectedFileName = null;
    }
  }

  onSubmit(): void {
    if (this.selectedForm === 'conge') {
      this.soumettreDemandeConge();
    } else {
      this.soumettreDemandeAbsence();
    }
  }

  private soumettreDemandeConge(): void {
    // Validation des champs obligatoires
    if (!this.typeConge || !this.nombreJours || !this.dateDebut || !this.dateFin) {
      this.message.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérification que la date de fin est après la date de début
    if (this.dateFin <= this.dateDebut) {
      this.message.error('La date de fin doit être postérieure à la date de début');
      return;
    }

    const demande = {
      dateDebut: this.formatDate(this.dateDebut),
      dateFin: this.formatDate(this.dateFin),
      nombreJours: this.nombreJours,
      typeConge: this.typeConge,
      statut: 'EnAttente',
      commentaire: this.comment || 'aucun',
      justificatif: this.selectedFileName || null
    };

    this.demandeCongeService.creerDemande(demande).subscribe({
      next: (response) => {
        this.message.success('Demande de congé soumise avec succès');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la soumission:', error);
        this.message.error('Erreur lors de la soumission de la demande');
      }
    });
  }

  private soumettreDemandeAbsence(): void {
    // Validation des champs obligatoires
    if (!this.typeAbsence || !this.nombreJours || !this.dateDebut || !this.dateFin) {
      this.message.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Vérification que la date de fin est après la date de début
    if (this.dateFin <= this.dateDebut) {
      this.message.error('La date de fin doit être postérieure à la date de début');
      return;
    }

    const demande = {
      dateDebut: this.formatDate(this.dateDebut),
      dateFin: this.formatDate(this.dateFin),
      nombreJours: this.nombreJours,
      typeAbsence: this.typeAbsence,
      commentaire: this.comment || 'aucun',
      justificatif: this.selectedFileName || null
    };

    this.absenceService.creerAbsence(demande).subscribe({
      next: (response) => {
        this.message.success('Demande d\'absence soumise avec succès');
        this.resetForm();
      },
      error: (error) => {
        console.error('Erreur lors de la soumission:', error);
        this.message.error('Erreur lors de la soumission de la demande d\'absence');
      }
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private resetForm(): void {
    this.typeConge = '';
    this.typeAbsence = '';
    this.nombreJours = null;
    this.dateDebut = null;
    this.dateFin = null;
    this.comment = '';
    this.selectedFile = null;
    this.selectedFileName = null;
  }

  onCancel(): void {
    this.resetForm();
  }
}