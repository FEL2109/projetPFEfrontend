import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  realm_access: {
    roles: string[];
  };

  email: string;
  given_name: string;
  family_name: string;
}


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    private apiUrl = 'http://localhost:8080/auth/login'; 
    
    constructor(private http: HttpClient, private router: Router) {}
  
    login(credentials: { username: string, password: string }): Observable<any> {
      return this.http.post(this.apiUrl, credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        withCredentials: true  
      });
    }
  
    handleLoginSuccess(token: string) {
      localStorage.setItem('access_token', token);
  
      const decodedToken = jwtDecode<DecodedToken>(token);
      const roles = decodedToken.realm_access.roles;
  
      if (roles.includes('USER')) {
        this.router.navigate(['/home-user']);
      } else if (roles.includes('ADMIN')) {
        this.router.navigate(['/home-admin']);
      }else if (roles.includes('RH')) {
        this.router.navigate(['/home-rh']);} 
      else {
        this.router.navigate(['/unauthorized']);
      }
    }
  getCurrentUser(): DecodedToken | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return null;
  }
  }