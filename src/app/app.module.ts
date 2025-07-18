import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/login/login.component';
import { HomeAdminComponent } from './ui/home-admin/home-admin.component';
import { HomeUserComponent } from './ui/home-user/home-user.component';
import { HomeRhComponent } from './ui/home-rh/home-rh.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProfilUserComponent } from './ui/home-user/profil-user/profil-user.component';
import { SoumettreDemandeCongeComponent } from './ui/home-admin/soumettre-demande-conge/soumettre-demande-conge.component';
import { TableauDeBordUserComponent } from './ui/home-user/tableau-de-bord-user/tableau-de-bord-user.component';
import { TableauDeBordAdminComponent } from './ui/home-admin/tableau-de-bord-admin/tableau-de-bord-admin.component';
import { ProfilAdminComponent } from './ui/home-admin/profil-admin/profil-admin.component';
import { EmployesAdminComponent } from './ui/home-admin/employes-admin/employes-admin.component';
import { DemandesCongesAdminComponent } from './ui/home-admin/demandes-conges-admin/demandes-conges-admin.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CalendrierJoursOfficielsComponent } from './ui/home-user/calendrier-jours-officiels-user/calendrier-jours-officiels.component';
import { CalendrierJoursOfficielsAdminComponent } from './ui/home-admin/calendrier-jours-officiels-admin/calendrier-jours-officiels-admin.component';
import { MesDemandesCongesComponent } from './ui/home-user/mes-demandes-conges/mes-demandes-conges.component';
import { HistoriquePersonnelComponent } from './ui/home-user/historique-personnel/historique-personnel.component';
import { SoldeCongesComponent } from './ui/home-user/solde-conges/solde-conges.component';
import { IcuSafePipe } from './ui/home-user/tableau-de-bord-user/icu-safe.pipe';

registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAdminComponent,
    HomeUserComponent,
    HomeRhComponent,
    ProfilUserComponent,
    SoumettreDemandeCongeComponent,
    TableauDeBordUserComponent,
    TableauDeBordAdminComponent,
    ProfilAdminComponent,
    EmployesAdminComponent,
    DemandesCongesAdminComponent,
    CalendrierJoursOfficielsComponent,
    CalendrierJoursOfficielsAdminComponent,
    MesDemandesCongesComponent,
    HistoriquePersonnelComponent,
    SoldeCongesComponent,
    IcuSafePipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzSelectModule,
    NzDatePickerModule,
    NzCardModule,
    NzCalendarModule,
    NzToolTipModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzTagModule,
    NzTableModule,
    NzPopoverModule,
    NzModalModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NzBadgeModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }