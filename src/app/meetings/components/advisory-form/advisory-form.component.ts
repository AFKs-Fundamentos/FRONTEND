import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {SelectButton} from 'primeng/selectbutton';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Fluid} from 'primeng/fluid';
import {IftaLabel} from 'primeng/iftalabel';
import {Button} from 'primeng/button';
import {Advisor} from '../../model/advisor.entity';
import {Advisory} from '../../model/advisory.entity';
import {AdvisoryService} from '../../services/advisory.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {AppointmentService} from '../../services/appointment.service';
import {Appointment} from '../../model/appointment.entity';

@Component({
  selector: 'app-advisory-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    DatePicker,
    Textarea,
    Fluid,
    IftaLabel,
    Button,
  ],
  providers: [AppointmentService],
  standalone: true,
  templateUrl: './advisory-form.component.html',
  styleUrl: './advisory-form.component.css',
})
export class AdvisoryFormComponent {
  @Input() advisor?: Advisor;
  @Output() formSent = new EventEmitter();

  appointmentForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    appointmentDate: new FormControl(''),
    appointmentTime: new FormControl('')
  });

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthenticationService
  ) {}

  onSubmit() {
    if (this.appointmentForm.invalid) {
      console.error('Formulario inválido');
      return;
    }

    const formValues = this.appointmentForm.value;

    const rawDate = new Date(formValues.appointmentDate);
    const appointmentDate = rawDate.toISOString().split('T')[0];

    let appointmentStartTime = '';
    const rawTime = formValues.appointmentTime;
    if (rawTime instanceof Date) {
      const hours = rawTime.getHours().toString().padStart(2, '0');
      const minutes = rawTime.getMinutes().toString().padStart(2, '0');
      appointmentStartTime = `${hours}:${minutes}`;
    }

  const appointment: Appointment = {
    appointmentDate,
    appointmentStartTime,
    description: formValues.description,
    advisorId: Number(this.advisor?.id ?? 0),
    customerId: this.authService.getCurrentUserId,
  };

    this.appointmentService.create(appointment).subscribe((newAppointment) => {
      console.log('Cita creada:', newAppointment);
      this.formSent.emit(newAppointment);
    });
  }


}
