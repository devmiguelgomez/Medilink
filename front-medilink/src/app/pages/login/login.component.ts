// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
  successMessage = '';
  loading = false;
  showPassword = false; // Para mostrar/ocultar contraseña

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Verificar si hay mensaje de registro exitoso
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
      this.successMessage = 'Registro exitoso. Por favor inicia sesión.';
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Intentando iniciar sesión con:', this.credentials.email);

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // La redirección se maneja en el servicio AuthService
      },
      error: (error) => {
        console.error('Error detallado:', error);
        
        if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Verifique su conexión a Internet.';
        } else if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Por favor verifique su correo y contraseña.';
        } else {
          this.errorMessage = error.error?.message || 'Error al iniciar sesión. Verifique sus credenciales.';
        }
        
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}