

import { Component, OnInit } from '@angular/core';
import { DemandeCongeService } from '../../../services/demamdeConge.service';
import { ScaleType } from '@swimlane/ngx-charts';

interface ChartSerie { name: string; value: number; }
interface ChartLine { name: string; series: ChartSerie[]; }

@Component({
  selector: 'app-tableau-de-bord-user',
  templateUrl: './tableau-de-bord-user.component.html',
  styleUrls: ['./tableau-de-bord-user.component.css']
})
export class TableauDeBordUserComponent implements OnInit {
  demandesConges: any[] = [];
  // Statut dynamique pour la demande de congé (exemple, à adapter selon vos données réelles)
  demandeCongeStatut: 'En attente' | 'Validée' | 'Refusée' = 'En attente';

  get demandesEnAttente(): number {
    // On compte les demandes dont le statut est 'En attente' dans les dernières demandes
    return (this.dernieresDemandes || []).filter((d: any) => d.statut === 'En attente').length;
  }
  pieChartView: [number, number] = [700, 420];
  // Pour widgets tableau de bord
  joursAbsenceMois: number = 0;
  prochainesAbsences: { type: string, debut: Date, fin: Date }[] = [];
  dernieresDemandes: { type: string, date: Date, statut: string }[] = [];
  // Données pour les graphiques statistiques
  absencesMoisData: ChartLine[] = [
    {
      name: 'Absences',
      series: [
        { name: 'Jan', value: 1 },
        { name: 'Fév', value: 0 },
        { name: 'Mar', value: 2 },
        { name: 'Avr', value: 1 },
        { name: 'Mai', value: 3 },
        { name: 'Juin', value: 2 },
        { name: 'Juil', value: 1 },
        { name: 'Août', value: 0 },
        { name: 'Sep', value: 2 },
        { name: 'Oct', value: 1 },
        { name: 'Nov', value: 0 },
        { name: 'Déc', value: 1 }
      ]
    }
  ];

  absencesTypeData: ChartSerie[] = [
    { name: 'Absence justifiée', value: 3 },
    { name: 'Absence non justifiée', value: 1 },
    { name: 'Absence pour formation', value: 2 },
    { name: 'Arrêt maladie', value: 2 },
    { name: 'Renouvellement arrêt maladie', value: 1 }
  ];
  acquis = 25; // Nombre de jours acquis
  soldeConges = 10; // Solde de congés restants
  joursPris = 12; // Jours déjà pris

  notifications = [
    { text: "Votre demande de congé a été approuvée.", time: new Date(), type: 'success' },
    { text: "Nouveau jour férié ajouté au calendrier.", time: new Date(), type: 'info' },
    // Ajoutez d'autres notifications avec type: 'success' | 'warning' | 'error' | 'info'
  ];
  // Prévision de solde de congés à la fin de l'année (exemple simple)
  soldePrevu: number = 0;
  soldePrevuPercent: number = 0;
  tauxAbsEquipe: number = 5.1; // Exemple, à remplacer par la vraie donnée
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


  // Palette 8 couleurs harmonisées, accessibles et distinctes (ordre = congesPieData)
  colorScheme = {
    domain: [
      '#a23a4a', // Congé payé (bordeaux)
      '#a2c3e6', // Congé sans solde (bleu très clair)
      '#c7e6f7', // Congé maternité/paternité (bleu ciel très pâle)
      '#7b6d8d', // Absence justifiée (mauve/gris)
      '#e6b7b7', // Absence non justifiée (rose pâle)
      '#b7dbe6', // Absence pour formation (bleu glacier)
      '#a2b7e6', // Arrêt maladie (bleu lavande)
      '#e6a2a2'  // Renouvellement arrêt maladie (rose brique clair)
    ],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };

  congesPieData = [
    { name: 'Congé payé', value: 8 },
    { name: 'Congé sans solde', value: 2 },
    { name: 'Congé maternité/paternité', value: 1 },
    { name: 'Absence justifiée', value: 3 },
    { name: 'Absence non justifiée', value: 1 },
    { name: 'Absence pour formation', value: 2 },
    { name: 'Arrêt maladie', value: 2 },
    { name: 'Renouvellement arrêt maladie', value: 1 }
  ];

  tauxPresence = 94; // Exemple, à adapter selon tes données

  demandesStats = { total: 0, validees: 0, enAttente: 0, refusees: 0 };

  constructor(private demandeCongeService: DemandeCongeService) {}

  ngOnInit() {
    // Responsive chart view
    this.updatePieChartView();
    window.addEventListener('resize', this.updatePieChartView.bind(this));

    // Force la conversion en Date pour chaque congé
    this.allCongesMaroc = this.allCongesMaroc.map(c => ({
      ...c,
      date: c.date instanceof Date ? c.date : new Date(c.date)
    }));
    this.congesAVenir = this.getNextConges();
    this.nextHolidays = this.getNextHolidays();

    // --- Widgets personnalisés ---
    this.joursAbsenceMois = this.calculerJoursAbsenceMois();
    this.prochainesAbsences = this.getProchainesAbsences();

    // Charger toutes les demandes de congés via le service (comme MesDemandesCongesComponent)
    this.loadDemandesConges();

    // --- Prévision de solde de congés ---
    this.calculerSoldePrevu();
  }
  // Calcule la prévision de solde de congés à la fin de l'année
  calculerSoldePrevu() {
    // Exemple simple : solde actuel - (moyenne jours pris/mois * nb mois restants)
    const moisActuel = new Date().getMonth() + 1;
    const moisRestants = 12 - moisActuel;
    const moyenneJoursPrisParMois = this.joursPris / (moisActuel || 1);
    this.soldePrevu = Math.max(0, Math.round(this.soldeConges - moyenneJoursPrisParMois * moisRestants));
    this.soldePrevuPercent = Math.round((this.soldePrevu / (this.acquis || 1)) * 100);
  }

  loadDemandesConges() {
    this.demandeCongeService.getAllDemandes().subscribe({
      next: (data) => {
        this.demandesConges = data;
        this.setDemandesStats();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des demandes de congés:', error);
        // fallback test data (2 approuvée, 2 refusée, 1 en attente)
        this.demandesConges = [
          { type: 'Congé payé', date: new Date(2025, 5, 10), statut: 'Approuvée' },
          { type: 'Sans solde', date: new Date(2025, 4, 22), statut: 'En attente' },
          { type: 'Maladie', date: new Date(2025, 3, 5), statut: 'Refusée' },
          { type: 'Congé payé', date: new Date(2025, 2, 12), statut: 'Approuvée' },
          { type: 'Sans solde', date: new Date(2025, 1, 18), statut: 'Refusée' }
        ];
        this.setDemandesStats();
      }
    });
  }

  setDemandesStats() {
    const demandes = this.demandesConges || [];
    // Harmonisation avec la logique de MesDemandesCongesComponent
    this.demandesStats.total = demandes.length;
    this.demandesStats.validees = demandes.filter(d => (d.statut || '').toLowerCase().replace(/é/g, 'e').includes('approuve') || (d.statut || '').toLowerCase().replace(/é/g, 'e').includes('valide')).length;
    this.demandesStats.enAttente = demandes.filter(d => (d.statut || '').toLowerCase().includes('attente')).length;
    this.demandesStats.refusees = demandes.filter(d => (d.statut || '').toLowerCase().replace(/é/g, 'e').includes('refuse')).length;
  }

  updatePieChartView() {
    // Responsive: largeur max 600px, min 320px, hauteur proportionnelle
    const container = document.querySelector('.dashboard-stats-card');
    let width = 700;
    if (container) {
      width = Math.max(500, Math.min(800, container.clientWidth - 8));
    } else {
      width = Math.max(500, Math.min(800, window.innerWidth - 32));
    }
    const height = Math.round(width * 0.6);
    this.pieChartView = [width, height];
  }

  // Calcule le nombre de jours d'absence sur le mois courant (exemple fictif)
  calculerJoursAbsenceMois(): number {
    // À remplacer par la vraie logique métier
    // Ici, on simule 2 jours d'absence ce mois
    return 2;
  }

  // Retourne les 2 prochaines absences (exemple fictif)
  getProchainesAbsences() {
    // À remplacer par la vraie logique (API ou service)
    return [
      { type: 'Congé payé', debut: new Date(2025, 6, 15), fin: new Date(2025, 6, 20) },
      { type: 'Maladie', debut: new Date(2025, 7, 2), fin: new Date(2025, 7, 3) }
    ];
  }

  // Retourne les 3 dernières demandes (exemple fictif)
  getDernieresDemandes() {
    // À remplacer par la vraie logique (API ou service)
    return [
      { type: 'Congé payé', date: new Date(2025, 5, 10), statut: 'Validée' },
      { type: 'Sans solde', date: new Date(2025, 4, 22), statut: 'En attente' },
      { type: 'Maladie', date: new Date(2025, 3, 5), statut: 'Refusée' }
    ];
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
    // Nettoyage des labels pour éviter les accolades non fermées
    const clean = (str: string) => str ? str.replace(/[{}]/g, '') : '';
    return this.allHolidays2025
      .filter(j => j.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, count)
      .map(j => ({ ...j, label: clean(j.label) }));
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