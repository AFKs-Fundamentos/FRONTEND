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
export class PaymentComponent implements OnInit{
  @Input() advisoryOrderId!: number;
  @Input() paymentIntentId!: string;
  clientSecret?: string;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
      const payment = {
        orderId: 1,
        amount: 100, // Ajusta el monto según corresponda
        currency: 'USD',
        status: '',
        description: 'Pago de asesoría',
        orderType: 'ADVISORY_ORDER'
      };

      this.paymentService.create(payment).subscribe({
        next: (response) => {
          this.clientSecret = response.clientSecret;
        },
        error: (error) => {
          console.error('Error al crear el pago:', error);
        }
      });
    }

  confirmar(): void {
      this.paymentService.confirm(this.paymentIntentId).subscribe({
        next: (response) => {
          console.log('Pago confirmado en backend:', response);
        },
        error: (error) => {
          console.error('Error al confirmar en backend:', error);
        }
      });
    }

    cancelar(): void {
      this.paymentService.cancel(this.paymentIntentId).subscribe({
        next: (response) => {
          console.log('Pago cancelado en backend:', response);
        },
        error: (error) => {
          console.error('Error al cancelar en backend:', error);
        }
      });
    }

}
