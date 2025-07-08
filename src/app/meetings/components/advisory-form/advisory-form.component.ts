import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Textarea} from 'primeng/textarea';
import {Fluid} from 'primeng/fluid';
import {IftaLabel} from 'primeng/iftalabel';
import {Button} from 'primeng/button';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {AppointmentService} from '../../services/appointment.service';

//Advisory Order service and entity
import {AdvisoryOrderService } from '../../../order/services/advisory-order.service';
import { AdvisoryOrder } from '../../../order/model/advisory-order.entity';

//Payment service
import { PaymentService } from '../../../payments/services/payment.service'; // Asegúrate de importar el servicio PaymentService


import {Appointment} from '../../model/appointment.entity';
import {Advisor} from '../../../profiles/model/advisor.entity';
import {Select} from 'primeng/select';
import {SchedulingService} from '../../../profiles/services/scheduling.service';
import {AdvisorSchedule} from '../../model/advisorSchedule.entity';
import {OnInit} from '@angular/core';
import {TimeSlotService} from '../../services/timeSlot.service';
import { CommonModule } from '@angular/common';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { PaymentComponent } from '../../../payments/components/payment/payment.component';
import {DialogComponent} from '../../../shared/components/dialog/dialog.component'; // Importing PaymentComponent for reference
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
    DialogModule,
    InputTextModule
  ],
  providers: [AppointmentService, TimeSlotService],
  standalone: true,
  templateUrl: './advisory-form.component.html',
  styleUrl: './advisory-form.component.css',
})
export class AdvisoryFormComponent implements OnInit {
  @Input() advisor?: Advisor;
  displayPaymentDialog: boolean = false;
  public clientSecret: string = '';
  @Output() dialogClosed = new EventEmitter<void>();
  @Output() formSent = new EventEmitter();
  @Output() clientSecretToParent = new EventEmitter<string>();

  advisoryOrderId!: number;
  availableDates: { label: string, value: string }[] = [];
  availableTimes: { label: string, value: string, scheduleHourId: number }[] = [];
  allSchedules: AdvisorSchedule[] = [];
  selectedDate: string = '';

  dialogTitle: string = 'Crear Payment';

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
    private advisoryOrderService: AdvisoryOrderService,
    private paymentService: PaymentService
  ) {
  }

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
      appointmentDate,
      appointmentStartTime,
      description: formValues.description,
      advisorId: Number(this.advisor?.id ?? 0),
      customerId: this.authService.getCurrentUserId,
    };

    //Crear appointment
    this.appointmentService.create(appointment).subscribe((newAppointment) => {
      console.log('cita creada:', newAppointment);
      // newAppointment.id es el id del appointment creado
      this.formSent.emit(newAppointment);

      const selectedTimeSlot = this.availableTimes.find(t => t.value === appointmentStartTime);
      // Crear advisoryOrder usando el id del appointment creado
      const advisoryOrder: AdvisoryOrder = {
        appointmentId: newAppointment.id,
        price: 50, // Aquí puedes establecer el precio si es necesario
        status: 'PENDING' // Estado inicial del pedido
      };

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
      console.log("probando");

      this.advisoryOrderService.create(advisoryOrder).subscribe((order) => {
        this.advisoryOrderId = order.id!;
        console.log('AdvisoryOrder creado:', order);
        const payment = {
          orderId: order.id!, // Asegúrate de que order.id esté definido
          amount: 100, // Ajusta el monto según corresponda
          currency: 'USD',
          status: 'requires_payment_method',
          description: 'Pago de asesoría',
          orderType: 'ADVISORY_ORDER'
        };
        // Ahora, crea el Payment solo después de que el advisoryOrder se haya creado
        this.createPayment(payment); // Pasamos el ID del advisoryOrder para crear el pago
      }, (error) => {
        console.error("Error al crear el advisoryOrder:", error);
      });
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

  // Crear el Payment después de crear el AdvisoryOrder
  createPayment(payment: any) {

    this.paymentService.create(payment).subscribe({
      next: (response) => {
        this.clientSecret = response.client_secret ?? ''; // Es importante que uses el nombre correcto aquí
        console.log('Client Secret recibido:', this.clientSecret);
        this.displayPaymentDialog = true;
        console.log('dialog booleab:', this.displayPaymentDialog);

      },
      error: (error) => {
        console.error('Error al crear el pago:', error);
      }
    });
  }

  enviarClientSecret() {
      this.clientSecretToParent.emit(this.clientSecret);
  }

  submitYMostrarPago() {
    this.createPayment();
    this.enviarClientSecret();
  }


}
