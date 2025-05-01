import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit, OnDestroy {
  // Datos de servicios
  services = [
    {
      icon: '💊',
      title: 'Consultas Médicas',
      description: 'Consultas con especialistas de primer nivel desde la comodidad de tu hogar.'
    },
    {
      icon: '🩺',
      title: 'Seguimiento de Salud',
      description: 'Monitoreo constante de tus indicadores de salud y medicamentos.'
    },
    {
      icon: '📋',
      title: 'Historial Médico',
      description: 'Acceso a tu historial médico completo en cualquier momento y lugar.'
    },
    {
      icon: '🏥',
      title: 'Citas Presenciales',
      description: 'Agenda citas presenciales con los mejores especialistas de tu zona.'
    }
  ];

  // Datos de testimonios
  testimonials = [
    {
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      name: 'María González',
      role: 'Paciente desde 2021',
      comment: 'Medilink ha transformado la manera en que cuido mi salud. Las consultas virtuales son muy convenientes y los médicos son excelentes.'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
      name: 'Carlos Rodríguez',
      role: 'Paciente desde 2020',
      comment: 'La facilidad para agendar citas y tener mi historial médico siempre disponible ha sido una gran ventaja. Totalmente recomendado.'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      name: 'Laura Martínez',
      role: 'Paciente desde 2022',
      comment: 'El seguimiento de mis medicamentos y recordatorios ha mejorado significativamente mi adherencia al tratamiento. ¡Gracias Medilink!'
    }
  ];

  // Índice del testimonio actual
  currentTestimonialIndex = 0;

  constructor() { }

  ngOnInit(): void {
    // Inicializar el sistema de partículas cuando el componente se carga
    this.initParticles();
    
    // Añadir listener para efectos de scroll
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy(): void {
    // Remover listener cuando el componente se destruye
    window.removeEventListener('scroll', this.handleScroll);
  }

  // Método para inicializar partículas
  initParticles(): void {
    // Este método se llamará desde ngOnInit
    // La implementación real depende de la biblioteca particles.js
    // que se carga mediante script en el HTML
  }

  // Método para manejar efectos de scroll
  handleScroll = (): void => {
    // Añadir clase 'scrolled' a la navbar cuando se hace scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Revelar elementos cuando son visibles
    const revealElements = document.querySelectorAll('.reveal-text:not(.revealed), .service-card:not(.revealed)');
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < window.innerHeight - elementVisible) {
        el.classList.add('revealed');
      }
    });
  }

  // Métodos para controlar los testimonios
  prevTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex === 0) 
      ? this.testimonials.length - 1 
      : this.currentTestimonialIndex - 1;
  }

  nextTestimonial(): void {
    this.currentTestimonialIndex = (this.currentTestimonialIndex === this.testimonials.length - 1) 
      ? 0 
      : this.currentTestimonialIndex + 1;
  }

  // Método para ir a un testimonio específico
  goToTestimonial(index: number): void {
    if (index >= 0 && index < this.testimonials.length) {
      this.currentTestimonialIndex = index;
    }
  }
}