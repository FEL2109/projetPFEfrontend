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
import { DemandesCongesAdminComponent } from './ui/home-admin/demandes-conges-admin/demandes-conges-admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut pour afficher le login
  { path: 'login', component: LoginComponent }, // Route explicite pour le login
    { 
    path: 'home-user', 
    component: HomeUserComponent, 
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' }, 
      { path: 'tableau-de-bord', component: TableauDeBordUserComponent },
      { path: 'profil', component: ProfilUserComponent },
      { path: 'soumettre-demande-conge', component: SoumettreDemandeCongeComponent }, // Route pour Profil utilisateur
    ]
  }, // Route pour home-user
  { path: 'home-rh', component: HomeRhComponent }, // Route pour home-rh
  { path: 'home-admin', 
    component: HomeAdminComponent, 
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' }, // Redirection par défaut
      { path: 'tableau-de-bord', component: TableauDeBordAdminComponent }, // Route pour Tableau de bord (Admin)
      { path: 'profil', component: ProfilAdminComponent },
      { path: 'employes', component: EmployesAdminComponent },
      { path: 'demandes-conges', component: DemandesCongesAdminComponent },
    ]
  }, // Route pour home-admin
  { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { } 