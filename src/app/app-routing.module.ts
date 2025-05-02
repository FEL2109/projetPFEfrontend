import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ui/login/login.component';
import { HomeUserComponent } from './ui/home-user/home-user.component';
import { HomeRhComponent } from './ui/home-rh/home-rh.component';
import { HomeAdminComponent } from './ui/home-admin/home-admin.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Route par défaut pour afficher le login
  { path: 'login', component: LoginComponent }, // Route explicite pour le login
  { path: 'home-user', component: HomeUserComponent }, // Route pour home-user
  { path: 'home-rh', component: HomeRhComponent }, // Route pour home-rh
  { path: 'home-admin', component: HomeAdminComponent }, // Route pour home-admin
  { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
