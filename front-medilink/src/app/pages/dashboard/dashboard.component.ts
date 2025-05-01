import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  isLoading = true;

  // Datos para el panel de pacientes
  patientStats = {
    appointments: 0,
    nextAppointment: null as string | null,
    notifications: 0
  };

  // Información médica de ejemplo
  medicalInfo = {
    bloodType: 'A+',
    allergies: ['Penicilina', 'Polen'],
    chronicConditions: ['Hipertensión']
  };

  // Citas próximas de ejemplo
  upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dra. María López',
      specialty: 'Cardiología',
      date: '2025-06-10T10:00:00',
      status: 'Confirmada'
    },
    {
      id: 2,
      doctor: 'Dr. Carlos Rodríguez',
      specialty: 'Medicina General',
      date: '2025-06-18T15:30:00',
      status: 'Pendiente'
    }
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtenemos información del usuario autenticado
    this.authService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
      this.isLoading = false;

      // Aquí podrías hacer una llamada a un servicio para obtener datos reales
      if (user) {
        this.loadUserData();
      }
    });
  }

  loadUserData(): void {
    // Aquí cargaríamos datos reales desde el backend
    // Por ahora usamos datos de ejemplo
    this.patientStats = {
      appointments: 5,
      nextAppointment: '2025-06-10T10:00:00',
      notifications: 2
    };
  }

  logout(): void {
    this.authService.logout();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
