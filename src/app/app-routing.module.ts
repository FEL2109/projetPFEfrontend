import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { HomeUserComponent } from './ui/home-user/home-user.component';
import { HomeRhComponent } from './ui/home-rh/home-rh.component';
import { HomeAdminComponent } from './ui/home-admin/home-admin.component';
import { ProfilUserComponent } from './ui/home-user/profil-user/profil-user.component';
import { SoumettreDemandeCongeComponent } from './ui/home-user/soumettre-demande-conge/soumettre-demande-conge.component'; 
import { TableauDeBordUserComponent } from './ui/home-user/tableau-de-bord-user/tableau-de-bord-user.component';
import { TableauDeBordAdminComponent } from './ui/home-admin/tableau-de-bord-admin/tableau-de-bord-admin.component';
import { ProfilAdminComponent } from './ui/home-admin/profil-admin/profil-admin.component';
import { EmployesAdminComponent } from './ui/home-admin/employes-admin/employes-admin.component';
import { AjouterEmployeComponent } from './ui/home-admin/ajouter-employe/ajouter-employe.component';
import { CalendrierJoursOfficielsComponent } from './ui/home-user/calendrier-jours-officiels-user/calendrier-jours-officiels.component';
import { CalendrierJoursOfficielsAdminComponent } from './ui/home-admin/calendrier-jours-officiels-admin/calendrier-jours-officiels-admin.component';
import { MesDemandesCongesComponent } from './ui/home-user/mes-demandes-conges/mes-demandes-conges.component';
import { SoldeCongesComponent } from './ui/home-user/solde-conges/solde-conges.component';
import { DemandesCongesAdminComponent } from './ui/home-admin/demandes-conges-admin/demandes-conges-admin.component';
import { DashboardRhComponent } from './ui/home-rh/dashboard-rh/dashboard-rh.component';
import { ProfilRhComponent } from './ui/home-rh/profil-rh/profil-rh.component';
import { GestionEmployesComponent } from './ui/home-rh/gestion-employes/gestion-employes.component';
import { RetardsAbsencesComponent } from './ui/home-rh/retards-absences/retards-absences.component';
import { MessagerieRhComponent } from './ui/home-rh/messagerie-rh/messagerie-rh.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut pour afficher le login
  { path: 'login', component: LoginComponent }, // Route explicite pour le login
  { path: 'home-user', 
    component: HomeUserComponent, 
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' }, 
      { path: 'tableau-de-bord', component: TableauDeBordUserComponent },
      { path: 'profil', component: ProfilUserComponent },
      { path: 'soumettre-demande-conge', component: SoumettreDemandeCongeComponent }, // Route pour Profil utilisateur
      { path: 'calendrier-jours-officiels', component: CalendrierJoursOfficielsComponent },
      { path: 'mes-demandes-conges', component: MesDemandesCongesComponent },
      {path: 'solde-conges', component: SoldeCongesComponent },

    ]
  }, // Route pour home-user
  { path: 'home-rh',
    component: HomeRhComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection par défaut
      { path: 'dashboard', component: DashboardRhComponent }, // Dashboard RH
      { path: 'profil', component: ProfilRhComponent },
      { path: 'gestion-employes', component: GestionEmployesComponent },
      { path: 'retards-absences', component: RetardsAbsencesComponent },
      { path: 'messagerie', component: MessagerieRhComponent },
    ]
  }, // Route pour home-rh
  { path: 'home-admin', 
    component: HomeAdminComponent, 
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' }, // Redirection par défaut
      { path: 'tableau-de-bord', component: TableauDeBordAdminComponent }, // Route pour Tableau de bord (Admin)
      { path: 'profil', component: ProfilAdminComponent },
      { path: 'employes', component: EmployesAdminComponent },
      { path: 'ajouter-employe', component: AjouterEmployeComponent },
      { path: 'demandes-conges', component: DemandesCongesAdminComponent },
      { path: 'calendrier-jours-officiels', component: CalendrierJoursOfficielsAdminComponent },
    ]
  }, // Route pour home-admin
  { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }