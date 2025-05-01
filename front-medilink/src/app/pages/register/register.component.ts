// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Modelo para almacenar los datos del usuario
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    console.log('Enviando datos de registro:', {
      name: this.user.name,
      email: this.user.email,
      // Ocultamos la contraseña en los logs
      password: '******'
    });
    
    this.authService.register(this.user).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        // Redireccionar al login tras registro exitoso
        this.router.navigate(['/login'], { 
          queryParams: { registered: 'true' }
        });
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error detallado:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        
        if (error.status === 502) {
          this.errorMessage = 'Error 502: El servidor no está disponible. Por favor, contacte al administrador.';
        } else if (error.status === 400) {
          this.errorMessage = error.error?.message || 'Error en los datos enviados. Por favor, revise la información.';
        } else if (error.status === 404) {
          this.errorMessage = 'La ruta de registro no está disponible. Contacte al administrador del sistema.';
        } else if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
        } else {
          this.errorMessage = error.error?.message || 
                            `Error ${error.status}: ${error.statusText || 'Desconocido'}`;
        }
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    this.errorMessage = '';
  }
}