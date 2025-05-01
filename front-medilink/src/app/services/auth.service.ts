import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'paciente' | 'profesional' | 'administrativo';
}

interface AuthResponse {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        // En una implementación real, deberías validar el token con el backend
        // o decodificar un JWT para obtener la información del usuario
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        if (userData) {
          this.currentUserSubject.next(userData);
        }
      } catch (error) {
        console.error('Error parsing stored user data', error);
        this.logout();
      }
    }
  }

  register(userData: { name: string; email: string; password: string; confirmPassword?: string }): Observable<any> {
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
    
    // La ruta completa será /api/auth/register (o lo que configure el backend)
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
      tap(response => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('user_data', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user_data');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
