import { Component, OnInit, Input, inject, signal,ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ButtonModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent{
  @Input() advisoryOrderId!: number;
  @Input() paymentIntentId!: string;
  @Input() clientSecret!: string; // Esto permite que clientSecret sea pasado desde el componente padre


  constructor(private paymentService: PaymentService) {}

  confirmar(): void {
      if (this.clientSecret) {
        this.paymentService.confirm(this.clientSecret).subscribe({
          next: (response) => {
            console.log('Pago confirmado en backend:', response);
          },
          error: (error) => {
            console.error('Error al confirmar en backend:', error);
          }
        });
      } else {
        console.error('clientSecret no está definido');
      }
    }

    cancelar(): void {
        if (this.clientSecret) {
          this.paymentService.cancel(this.clientSecret).subscribe({
            next: (response) => {
              console.log('Pago cancelado en backend:', response);
            },
            error: (error) => {
              console.error('Error al cancelar en backend:', error);
            }
          });
        } else {
          console.error('clientSecret no está definido');
        }
      }
}
