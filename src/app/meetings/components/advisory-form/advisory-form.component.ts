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

@Component({
  selector: 'app-advisory-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    Textarea,
    Fluid,
    IftaLabel,
    Button,
    Select,
  ],
  providers: [AppointmentService, TimeSlotService],
  standalone: true,
  templateUrl: './advisory-form.component.html',
  styleUrl: './advisory-form.component.css',
})
export class AdvisoryFormComponent implements OnInit {
  @Input() advisor?: Advisor;
  @Output() formSent = new EventEmitter();

  availableDates: { label: string, value: string }[] = [];
  availableTimes: { label: string, value: string }[] = [];
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
    private scheduleService:SchedulingService,
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

    const appointmentDateRaw = formValues.appointmentDate;
    const appointmentDate = typeof appointmentDateRaw === 'object' && appointmentDateRaw?.value
      ? appointmentDateRaw.value
      : appointmentDateRaw;

    const appointmentTimeRaw = formValues.appointmentTime;
    const appointmentStartTime = typeof appointmentTimeRaw === 'object' && appointmentTimeRaw?.value
      ? appointmentTimeRaw.value
      : appointmentTimeRaw;

    if (!appointmentDate || !appointmentStartTime) {
      console.error('Falta fecha u hora');
      return;
    }

    const appointment: Appointment = {
      appointmentDate,
      appointmentStartTime,
      description: formValues.description,
      advisorId: Number(this.advisor?.id ?? 0),
      customerId: this.authService.getCurrentUserId,
    };

    this.appointmentService.create(appointment).subscribe((newAppointment) => {
      console.log('✅ Cita creada:', newAppointment);
      this.formSent.emit(newAppointment);
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

    console.log('Fecha seleccionada:', dateValue);

    const filteredHours = this.allSchedules
      .filter(s => s.availableDate === dateValue && s.isAvailable)
      .map(s => ({
        label: `${s.startTime} - ${s.endTime}`,
        value: s.startTime
      }));

    this.availableTimes = filteredHours;
    this.appointmentForm.get('appointmentTime')?.setValue(null);


  }



}
