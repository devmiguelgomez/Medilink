// src/app/pages/login/login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  // Método para manejar el envío del formulario
  onSubmit(): void {
    console.log('Credenciales enviadas:', this.credentials);

    // Simulación de autenticación exitosa
    alert('Inicio de sesión exitoso');

    // Redirigir al usuario a la página principal después del inicio de sesión
    this.router.navigate(['/home']);
  }
}