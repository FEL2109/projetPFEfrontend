import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employes.service';
  @Component({ 
    selector: 'app-employes-admin', 
    templateUrl: './employes-admin.component.html',
     styleUrls: ['./employes-admin.component.css'] })
export class EmployesAdminComponent implements OnInit {
  employes: any[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  goToAddEmploye(): void {
    this.router.navigate(['/home-admin/ajouter-employe']);
  }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    this.errorMessage = null;
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any[]) => {
        this.employes = data;
        this.loading = false;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des employés', err);
        this.errorMessage = `Erreur ${err.status}: ${err.message}`;
        this.loading = false;
      }
    });
  }
}