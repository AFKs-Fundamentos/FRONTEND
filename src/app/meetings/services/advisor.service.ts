import { Injectable } from '@angular/core';
import {Advisor} from '../model/advisor.entity';


@Injectable()
export class AdvisorService {
  especialidades = ['Finanzas', 'Legal', 'Marketing', 'Tecnología', 'Recursos Humanos'];
  tiposAsesoria = ['Presencial', 'Virtual', 'Mixta'];
  ubicaciones = ['Lima', 'Cusco', 'Arequipa', 'Trujillo', 'Piura'];

  getData(): Advisor[] {
    return Array.from({ length: 10 }).map(() => this.generateAdvisor());
  }

  generateAdvisor(): Advisor {
    return {
      id: this.generateId(),
      nombre: this.generateNombre(),
      especialidad: this.randomFrom(this.especialidades),
      calificacion: this.randomRating(),
      tipoAsesoria: this.randomFrom(this.tiposAsesoria),
      disponibilidad: this.generateDisponibilidad(),
      ubicacion: this.randomFrom(this.ubicaciones),
    };
  }

  generateId(): string {
    // Genera un ID alfanumérico de 8 caracteres
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 8 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  generateNombre(): string {
    const nombres = ['Juan Pérez', 'Ana Gómez', 'Carlos Ramírez', 'Lucía Torres', 'Mario Díaz'];
    return this.randomFrom(nombres);
  }

  randomFrom(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomRating(): number {
    return parseFloat((Math.random() * 2 + 3).toFixed(1)); // entre 3.0 y 5.0
  }

  generateDisponibilidad(): Date[] {
    const dates = [];
    for (let i = 0; i < 3; i++) {
      const day = new Date();
      day.setDate(day.getDate() + Math.floor(Math.random() * 30));
      dates.push(new Date(day));
    }
    return dates;
  }

  getAdvisors(): Promise<Advisor[]> {
    return Promise.resolve(this.getData());
  }
}
