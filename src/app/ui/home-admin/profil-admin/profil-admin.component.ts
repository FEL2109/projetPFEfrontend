import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {
  currentUser: any;
  
    @Output() toggleMenu = new EventEmitter<void>();
  
    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.currentUser = this.authService.getCurrentUser();
      console.log('Utilisateur connecté :', this.currentUser);
    }
  
    onToggleMenu(): void {
      this.toggleMenu.emit();
    }
  
}
