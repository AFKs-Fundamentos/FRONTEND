import { Component,OnInit,Input } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-confirm-cartshopping-payment',
  imports: [ToastModule, ButtonModule],
  templateUrl: './confirm-cartshopping-payment.component.html',
  styleUrl: './confirm-cartshopping-payment.component.css',
  providers: [MessageService]
})
export class ConfirmCartshoppingPaymentComponent implements OnInit{
  @Input() id: string = '';
  @Input() cartShoppingId: string = '';
  @Input() productPrice: number = 0;
  @Input() productName: string = '';
  @Input() quantity: string = '';

  constructor(private paymentService:PaymentService, private messageService: MessageService) {}

  ngOnInit() {

  }
  this.paymentService.confirm(id).subscribe({
    data => {
      }
}
