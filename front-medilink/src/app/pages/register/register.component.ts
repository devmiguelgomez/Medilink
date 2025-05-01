// src/app/pages/register/register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
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

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    console.log('Datos de registro enviados:', this.user);

    // Simulación de registro exitoso
    alert('Registro exitoso');
    this.resetForm();
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
}