import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../model/shopping-cart.entity';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { ProductItemService } from '../../services/product-item.service';
import { ProductItem } from '../../model/product-item.entity';

import { RouterLink} from '@angular/router';

import { DialogModule } from 'primeng/dialog';


//Product Order
import { ProductOrder } from '../../../order/model/product-order.entity';
import { ProductOrderService } from '../../../order/services/product-order.service';

import { PaymentService } from '../../../payments/services/payment.service'; // Importing PaymentService for payment handling
import { Payment } from '../../../payments/model/payment.entity';
import { OrderType } from '../../../payments/model/orderType.entity';


@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    CurrencyPipe,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule,
    RouterLink,
    DialogModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: ProductItem[] = [];
  currentCart?: ShoppingCart;
  loading: boolean = true;
  showPaymentDialog = false;
  paymentClientSecret: string = '';
  paymentId: string = '';
  readonly PENDING_STATUS = 'PENDING';
  readonly PROCESS_STATUS = 'PROCESS';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productItemService: ProductItemService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private productOrderService: ProductOrderService, // Injecting ProductOrderService for future use
    private paymentService: PaymentService // Injecting PaymentService for payment handling
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  private get userId(): number | null {
    return this.authenticationService.getCurrentUserId;
  }

  loadCartItems(): void {
    this.loading = true;
    this.cartItems = [];

    if (!this.userId) {
      this.showMessage('warn', 'Advertencia', 'No hay usuario autenticado');
      this.loading = false;
      return;
    }

    this.shoppingCartService.getByUserClientIdAndStatus(this.userId, this.PENDING_STATUS)
      .subscribe({
        next: (carts) => this.handleCartResponse(carts),
        error: () => this.handleCartError()
      });
  }

  private handleCartResponse(carts: ShoppingCart[]): void {
    if (!carts || carts.length === 0) {
      this.showMessage('info', 'Información', 'No hay productos en el carrito');
      this.loading = false;
      return;
    }

    this.currentCart = carts[0];
    this.cartItems = (this.currentCart.productItems || []).map(item => ({
      ...item,
      shoppingCartId: this.currentCart?.id ?? 0
    }));
    this.loading = false;
  }

  private handleCartError(): void {
    this.showMessage('error', 'Error', 'No se pudieron cargar los items del carrito');
    this.loading = false;
  }

  updateQuantity(item: ProductItem): void {
    if (item.quantity <= 0) {
      this.removeItem(item.id!);
      return;
    }

    this.productItemService.update(item.id!, item).subscribe({
      next: () => this.showMessage('success', 'Éxito', 'Cantidad actualizada'),
      error: () => this.showMessage('error', 'Error', 'No se pudo actualizar la cantidad')
    });
  }

  removeItem(itemId: number): void {
    this.loading = true;
    this.productItemService.delete(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.showMessage('success', 'Éxito', 'Producto eliminado del carrito');
        this.loading = false;
      },
      error: () => {
        this.showMessage('error', 'Error', 'No se pudo eliminar el producto');
        this.loading = false;
      }
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.productPrice * item.quantity),
      0
    );
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      this.showMessage('warn', 'Advertencia', 'No hay productos para comprar');
      return;
    }

    this.loading = true;
    const updateObservables = this.cartItems.map(item => {
      item.statusCartShoppingItem = this.PROCESS_STATUS;
      return this.productItemService.update(item.id!, item);
    });

    forkJoin(updateObservables).subscribe({
      next: () => {
        const nuevoPedido = new ProductOrder();
              nuevoPedido.userClientId = this.userId ?? 0;
              nuevoPedido.totalPrice = this.getTotal();
              nuevoPedido.currency = 'USD';
              nuevoPedido.shoppingCartId = this.currentCart?.id ?? 0;
              nuevoPedido.status = this.PENDING_STATUS;

              this.productOrderService.create(nuevoPedido).subscribe({
                next: (order) => {
                  console.log('Holao pedido creado:', order);
                  // Aquí crea el pago y obtiene el client_secret
                  const nuevoPago: Payment = {
                        orderId: order.id!,
                        amount: order.totalPrice * 100,
                        currency: 'PEN',
                        status: 'requires_payment_method',
                        description: 'Pago de pedido',
                        orderType: order.orderType as OrderType
                      };
                  this.paymentService.create(nuevoPago).subscribe({
                    next: (payment) => {
                      this.paymentId = payment.id ?? '';
                      console.log(this.paymentId);
                      this.showPaymentDialog = true; // Muestra el diálogo
                      this.loading = false;
                    },
                    error: () => {
                      this.showMessage('error', 'Error', 'Error al crear el pago');
                      this.loading = false;
                    }
                  });
                },
                error: () => {
                  this.showMessage('error', 'Error', 'Error al crear el pedido');
                  this.loading = false;
                }
              });
      },
      error: () => {
        this.showMessage('error', 'Error', 'Error al finalizar la ORDEN');
        this.loading = false;
      }
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

  // 3. Métodos para confirmar o cancelar el pago
  confirmar(): void {
        if (this.paymentId) {
          this.paymentService.confirm(this.paymentId).subscribe({
            next: (response) => {
              console.log('Pago confirmado en backend:', response);
            },
            error: (error) => {
              console.error('Error al confirmar en backend:', error);
            }
          });
        } else {
          console.error('ID PAYMENT NEW no está definido');
        }
      }

      cancelar(): void {
          if (this.paymentId) {
            this.paymentService.cancel(this.paymentId).subscribe({
              next: (response) => {
                console.log('Pago cancelado en backend:', response);
              },
              error: (error) => {
                console.error('Error al cancelar en backend:', error);
              }
            });
          } else {
            console.error('ID PAYMENT NEW no está definido');
          }
      }


}
