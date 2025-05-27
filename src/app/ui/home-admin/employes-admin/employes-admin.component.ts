import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employes.service';

@Component({
  selector: 'app-employes-admin',
  templateUrl: './employes-admin.component.html',
  styleUrls: ['./employes-admin.component.css']
})
export class EmployesAdminComponent implements OnInit {
  employes: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => this.employes = data,
      error: (err) => console.error('Erreur lors du chargement des employés', err)
    });
  }
}
