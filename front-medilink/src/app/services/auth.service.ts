import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Definimos la URL de la API desde un valor estático para evitar problemas con environment
const API_URL = 'http://localhost:3000';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_URL;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        if (userData && userData.id) {
          this.currentUserSubject.next(userData);
        } else {
          this.logout();
        }
      } catch (error) {
        console.error('Error parsing stored user data', error);
        this.logout();
      }
    }
  }

  register(userData: { name: string; email: string; password: string; role?: string; confirmPassword?: string }): Observable<any> {
    console.log('Enviando solicitud a:', `${this.apiUrl}/auth/register`);
    
    // Crear una copia sin la propiedad confirmPassword
    const userDataToSend = { ...userData };
    delete userDataToSend.confirmPassword;
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    
    return this.http.post(`${this.apiUrl}/auth/register`, userDataToSend, httpOptions);
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials, httpOptions).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          
          // Redireccionar según el rol
          this.redirectBasedOnRole(response.user.role);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserRole(): string | null {
    const user = this.currentUserSubject.getValue();
    return user ? user.role : null;
  }

  redirectBasedOnRole(role: string): void {
    switch(role) {
      case 'paciente':
        this.router.navigate(['/dashboard']);
        break;
      case 'profesional':
        this.router.navigate(['/profesional']);
        break;
      case 'administrativo':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }
}
