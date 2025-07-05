import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {DatePicker} from 'primeng/datepicker';
import {Fluid} from 'primeng/fluid';
import {Button} from 'primeng/button';
import {Schedule} from '../../model/schedule.entity';
import {SchedulingService} from '../../services/scheduling.service';

@Component({
  selector: 'app-schedules-form',
  imports: [
    ReactiveFormsModule,
    DatePicker,
    Fluid,
    Button,
    FormsModule,
  ],
  standalone: true,
  providers: [SchedulingService],
  templateUrl: './schedules-form.component.html',
  styleUrl: './schedules-form.component.css'
})
export class SchedulesFormComponent {
  @Output() availabilityCreated = new EventEmitter<Schedule>();
  availabilityForm: FormGroup;
  @Output() showFormInChild = new EventEmitter<void>();

  constructor(
    private availabilityService: SchedulingService,
    private authenticationService: AuthenticationService
  ) {
    this.availabilityForm = new FormGroup({
      dateRange: new FormControl<[Date, Date] | null>(null),
      startTime: new FormControl<Date | null>(null),
      endTime: new FormControl<Date | null>(null)
    });
  }

  onSubmit() {
    if (this.availabilityForm.invalid) {
      console.error('Formulario inválido');
      this.showFormInChild.emit();
      return;
    }

    const values = this.availabilityForm.value;

    const range: [Date, Date] = values.dateRange;
    const startTime = this.formatTime(values.startTime);
    const endTime = this.formatTime(values.endTime);

    if (!range || !range[0] || !range[1]) {
      console.error('Rango de fechas no válido');
      return;
    }

    const [startDate, endDate] = range;
    const datesInRange = this.getDatesBetween(startDate, endDate);

    const requests = datesInRange.map((date) => {
      const formattedDate = this.formatDate(date);

      const schedule: Schedule = {
        advisorId: this.authenticationService.getCurrentUserId,
        availableDate: formattedDate,
        startTime: startTime,
        endTime: endTime,
        isAvailable: true
      };

      return this.availabilityService.create(schedule).toPromise();
    });

    Promise.all(requests)
      .then((results) => {
        console.log('Disponibilidades creadas:', results);
        results.forEach(res => this.availabilityCreated.emit(res));
      })
      .catch((err) => {
        console.error('Error al crear disponibilidades:', err);
      });
  }

  private formatDate(date: Date | string): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0]; // yyyy-mm-dd
    }
    return date;
  }

  private formatTime(date: Date | string): string {
    if (date instanceof Date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return date;
  }

  private getDatesBetween(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }
}
