// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true, // Asegúrate de que standalone esté en true
  imports: [FormsModule], // Importa FormsModule aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Modelo para almacenar las credenciales del usuario
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el envío del formulario
  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al iniciar sesión');
      },
    });
  }
}