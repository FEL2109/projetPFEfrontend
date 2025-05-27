import { Component, Inject, OnInit } from '@angular/core';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {
  user: any;

  constructor(
    public modalRef: NzModalRef<ProfilUserComponent>,
    @Inject(NZ_MODAL_DATA) public data: any,
    private authService: AuthService
  ) {
    this.user = data?.user || {};
  }

  logout(): void {
    this.modalRef.close();
  }

  save(): void {
    console.log('Enregistrer cliqué');
    this.modalRef.close();
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const roles: string[] = currentUser.realm_access?.roles || [];
      const managerRole = roles.find(r => r.toLowerCase() === 'manager');
      this.user = {
        ...currentUser,
        role: managerRole || ''
      };
    }
  }
}

