import { Component, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions
} from '@stripe/stripe-js';
import {ButtonModule} from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [StripeCardComponent,ButtonModule,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  @Input() orderId!: string;
  @Input() advisoryDetails: any;
  @Input() price!: number;
  @Input() paymentIntentId!: string;
  @Input() clientSecret!: string;

  @Output() paymentSuccess = new EventEmitter<string>();
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  constructor(private paymentService: PaymentService,private stripeService: StripeService
    ) {}

  cardOptions: StripeCardElementOptions = {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          fontWeight: '400',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '16px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    };

    elementsOptions: StripeElementsOptions = {
      locale: 'es'
    };


  confirmar(): void {
    this.paymentService.confirm(this.clientSecret).subscribe({
      next: (response) => {
        console.log('Pago confirmado en backend:', response);
        this.paymentSuccess.emit(this.clientSecret);
      },
      error: (error) => {
        console.error('Error al confirmar en backend:', error);
      }
    });
  }

  cancelar(): void {
    this.paymentService.cancel(this.clientSecret).subscribe({
      next: (response) => {
        console.log('Pago cancelado en backend:', response);
      },
      error: (error) => {
        console.error('Error al cancelar en backend:', error);
      }
    });
  }

}
