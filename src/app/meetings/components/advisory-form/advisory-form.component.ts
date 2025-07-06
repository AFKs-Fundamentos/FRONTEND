import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {Fluid} from 'primeng/fluid';
import {IftaLabel} from 'primeng/iftalabel';
import {Button} from 'primeng/button';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../model/appointment.entity';
import {Advisor} from '../../../profiles/model/advisor.entity';
import {Select} from 'primeng/select';
import {SchedulingService} from '../../../profiles/services/scheduling.service';
import {AdvisorSchedule} from '../../model/advisorSchedule.entity';
import {OnInit} from '@angular/core';
import {TimeSlotService} from '../../services/timeSlot.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PaymentComponent } from '../../../payments/components/payment/payment.component'; // Importing PaymentComponent for reference
@Component({
  selector: 'app-advisory-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    Textarea,
    Fluid,
    IftaLabel,
    Button,
    Select,
    PaymentComponent,
    DialogModule
  ],
  providers: [AppointmentService, TimeSlotService],
  standalone: true,
  templateUrl: './advisory-form.component.html',
  styleUrl: './advisory-form.component.css',
})
export class AdvisoryFormComponent implements OnInit {
  @Input() advisor?: Advisor;
  clientSecret!: string;
  displayPaymentDialog: boolean = false;
  @Output() formSent = new EventEmitter();
  paymentIntentId: string = '';
  paymentOrderId!: string;
  availableDates: { label: string, value: string }[] = [];
  availableTimes: { label: string, value: string, scheduleHourId: number }[] = [];
  allSchedules: AdvisorSchedule[] = [];
  selectedDate: string = '';

  appointmentForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    appointmentDate: new FormControl(''),
    appointmentTime: new FormControl('')
  });

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthenticationService,
    private scheduleService: SchedulingService,
    private timeSlotService: TimeSlotService,
  ) {}

  ngOnInit() {
    this.loadScheduling();
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const formValues = this.appointmentForm.value;
    const appointmentDate = formValues.appointmentDate?.value || formValues.appointmentDate;
    const appointmentStartTime = formValues.appointmentTime?.value || formValues.appointmentTime;

    if (!appointmentDate || !appointmentStartTime) {
      console.error('Falta fecha u hora');
      return;
    }

    const appointment: Appointment = {
      id: '', //para el back
      appointmentDate,
      appointmentStartTime,
      description: formValues.description,
      advisorId: Number(this.advisor?.id ?? 0),
      customerId: this.authService.getCurrentUserId,
    };

    this.appointmentService.create(appointment).subscribe((newAppointment) => {
      console.log('cita creada:', newAppointment);
      // newAppointment.id es el id del appointment creado
      this.paymentIntentId = '';
      this.paymentOrderId = newAppointment.id; //duda
      this.clientSecret = '';
      this.formSent.emit(newAppointment);

      const selectedTimeSlot = this.availableTimes.find(t => t.value === appointmentStartTime);

      if (selectedTimeSlot) {
        this.timeSlotService.putTimeSlot(selectedTimeSlot.scheduleHourId, false).subscribe({
          next: (res) => {
            console.log('horario actualizado:', res);
            this.loadScheduling();
            },
          error: (err) => {
            console.error('eror al actualizar horario:', err);
          }
        });
      }
      this.displayPaymentDialog = true;
    });
  }

  loadScheduling() {
    const advisorId = this.advisor?.id ?? 0;
    if (!advisorId) return;

    this.scheduleService.getScheduleByAdvisorId(advisorId).subscribe((schedules: AdvisorSchedule[]) => {
      this.allSchedules = schedules.filter(s => s.isAvailable);

      const uniqueDates = Array.from(new Set(this.allSchedules.map(s => s.availableDate)));

      this.availableDates = uniqueDates.map(date => ({
        label: date,
        value: date
      }));

      this.availableTimes = [];
      this.appointmentForm.get('appointmentTime')?.setValue(null);
    });
  }

  onDateChange(selectedDate: { label: string; value: string }) {
    const dateValue = selectedDate.value;

    console.log('fecha seleccionada:', dateValue);

    const filteredHours: { label: string, value: string, scheduleHourId: number }[] = [];

    this.allSchedules
      .filter(s => s.availableDate === dateValue && s.isAvailable)
      .forEach(schedule => {
        schedule.scheduleHours?.forEach(hour => {
          if (hour.available) {
            filteredHours.push({
              label: `${hour.startTime} - ${hour.endTime}`,
              value: hour.startTime,
              scheduleHourId: hour.id
            });
          }
        });
      });

    this.availableTimes = filteredHours;
    this.appointmentForm.get('appointmentTime')?.setValue(null);
  }

  onPaymentSuccess(paymentIntentId: string) {
    console.log('Pago exitoso! PaymentIntent ID:', paymentIntentId);
    }
}
