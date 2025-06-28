import {Component, Input} from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {TableModule} from 'primeng/table';
import {Schedule} from '../../model/schedule.entity';

@Component({
  selector: 'app-schedules',
  imports: [
    NgClass,
    TableModule,
    CommonModule
  ],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent {
  @Input() schedules: Schedule[] = [];

  @Input() advisorId?: number;

  get uniqueSchedules(): Schedule[] {
    const seen = new Set<string>();
    const filtered = this.schedules
      .filter(s => !this.advisorId || s.advisorId === this.advisorId) // ← Filtra por asesor
      .filter(s => {
        const key = `${s.availableDate}|${s.startTime}|${s.endTime}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    return filtered.sort((a, b) => {
      const dateA = `${a.availableDate}T${a.startTime}`;
      const dateB = `${b.availableDate}T${b.startTime}`;
      return dateA.localeCompare(dateB);
    });
  }


}
