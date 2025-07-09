import { Component, OnInit, Input, inject, signal,ViewChild,Output, EventEmitter } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup,FormBuilder, Validators } from '@angular/forms';
// Importing necessary modules and services for payment
import { PaymentService } from '../../services/payment.service';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';

import {
  StripePaymentElementOptions ,
  StripeElementsOptions
} from '@stripe/stripe-js';

import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ButtonModule,CommonModule, ConfirmDialog, ToastModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent{
  @Input() advisoryOrderId!: number;
  @Input() paymentIntentId!: string;
  @Input() clientSecret!: string; // Esto permite que clientSecret sea pasado desde el componente padre
  @Input() paymentId!: string;
  @Output() close = new EventEmitter<void>();
  visible = true;
  @Output() cancel = new EventEmitter<void>();
  @Output() paymentCompleted = new EventEmitter<void>();


  constructor(private paymentService: PaymentService,private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirmar(): void {
      this.confirmationService.confirm({
        message: '¿Confirmar el pago?',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          if (this.paymentId) {
            this.paymentService.confirm(this.paymentId).subscribe({
              next: (response) => {
                this.paymentCompleted.emit();
                this.messageService.add({ severity: 'success', summary: 'Pago Confirmado', detail: 'El pago fue procesado correctamente' });
                this.close.emit();
              },
              error: (error) => {
                console.error('Error al confirmar en backend:', error);
              }
            });
          } else {
            console.error('paymentId no está definido');
          }
        }
      });
    }

    cancelar(): void {
        this.confirmationService.confirm({
          message: '¿Estás seguro de que deseas cancelar?',
          acceptLabel: 'Sí',
          rejectLabel: 'No',
          accept: () => {
            if (this.paymentId) {
              this.paymentService.cancel(this.paymentId).subscribe({
                next: (response) => {
                  this.cancel.emit();
                  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo confirmar el pago' });
                  this.close.emit();

                },
                error: (error) => {
                  console.error('Error al cancelar en backend:', error);
                }
              });
            } else {
              console.error('paymentId no está definido');
            }
          }
        });
      }
}
