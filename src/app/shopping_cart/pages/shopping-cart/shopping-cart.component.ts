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
    ProgressSpinnerModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit {
  cartItems: ShoppingCart[] = [];
  loading: boolean = true;
  userId: number = 100;
  readonly PENDING_STATUS = 'PENDING';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.loading = true;
    console.log('Parametros enviados:', this.userId, this.PENDING_STATUS);
    this.shoppingCartService
      .getByStatusCartShoppingItemAndUserClientId(this.userId, this.PENDING_STATUS)
      .subscribe({
        next: (items) => {
          console.log('Datos recibidos para mostrar:', items);
          this.cartItems = items;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading cart items:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron cargar los items del carrito'
          });
          this.loading = false;
        }
      });
  }

  updateQuantity(item: ShoppingCart): void {
    this.shoppingCartService.update(item.id, item).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Cantidad actualizada'
        });
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar la cantidad'
        });
      }
    });
  }

  removeItem(itemId: number): void {
    this.shoppingCartService.delete(itemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto eliminado del carrito'
        });
      },
      error: (err) => {
        console.error('Error removing item:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto'
        });
      }
    });
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.product_price * item.product_quantity),
      0
    );
  }

  checkout(): void {
    this.loading = true;
    const updateObservables = this.cartItems.map(item => {
      item.status_shopping_cart_item = 'COMPLETED';// estado luego de la compra realizada con exito simulacion despues de la pasarela de pago
      return this.shoppingCartService.update(item.id, item);
    });

    forkJoin(updateObservables).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Compra realizada con éxito'
        });
        this.loadCartItems();
      },
      error: (err) => {
        console.error('Error during checkout:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al finalizar la compra'
        });
        this.loading = false;
      }
    });
  }
}
