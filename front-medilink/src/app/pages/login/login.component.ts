// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Modelo para almacenar las credenciales del usuario
  credentials = {
    email: '',
    password: ''
  };
  
  errorMessage = '';
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  // Método para manejar el envío del formulario
  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        // Redireccionar al usuario a la página principal después del inicio de sesión
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
        this.errorMessage = error.error?.message || 'Error al iniciar sesión. Verifique sus credenciales.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}