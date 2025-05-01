// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  // Ruta predeterminada (redirige a '/home')
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rutas principales
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent}, // Usando el mismo componente para registro por simplicidad

  // Ruta comodín para manejar rutas no encontradas
  { path: '**', redirectTo: '/home' }
];