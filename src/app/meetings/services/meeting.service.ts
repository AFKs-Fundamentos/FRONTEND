import { Injectable } from '@angular/core';
import { Meeting } from '../model/meeting.entity';

@Injectable()
export class MeetingService {
  estados: Meeting['estado'][] = ['EN_ESPERA', 'EN_PROCESO', 'COMPLETADA'];
  tiposReunion: Meeting['tipoReunion'][] = ['PRESENCIAL', 'VIRTUAL'];
  lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

  getMeetings(): Promise<Meeting[]> {
    return Promise.resolve(this.generateMeetings(10));
  }

  private generateMeetings(count: number): Meeting[] {
    return Array.from({ length: count }, () => this.generateMeeting());
  }

  private generateMeeting(): Meeting {
    const estado = this.randomFrom(this.estados);
    return {
      id: this.generateId(),
      hora: this.randomHour(),
      fecha: this.randomDate(),
      tipoReunion: this.randomFrom(this.tiposReunion),
      email: this.generateEmail(),
      descripcion: this.lorem,
      estado,
      rating: estado === 'COMPLETADA' ? this.randomRating() : null
    };
  }

  private generateId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 8 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
  }

  private randomFrom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private randomDate(): Date {
    const day = new Date();
    day.setDate(day.getDate() + Math.floor(Math.random() * 30));
    return day;
  }

  private randomHour(): string {
    const hour = Math.floor(Math.random() * 12) + 8; // entre 8 y 19
    const minutes = ['00', '15', '30', '45'];
    return `${hour}:${this.randomFrom(minutes)}`;
  }

  private randomRating(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  private generateEmail(): string {
    const names = ['andre', 'lucia', 'carlos', 'ana', 'jose'];
    const domains = ['gmail.com', 'hotmail.com', 'outlook.com'];
    return `${this.randomFrom(names)}@${this.randomFrom(domains)}`;
  }
}
