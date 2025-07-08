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
  cartItems: ProductItem[] = [];
  currentCart?: ShoppingCart;
  loading: boolean = true;
  readonly PENDING_STATUS = 'PENDING';
  readonly COMPLETED_STATUS = 'COMPLETED';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private productItemService: ProductItemService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
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
      item.statusCartShoppingItem = this.COMPLETED_STATUS;
      return this.productItemService.update(item.id!, item);
    });

    forkJoin(updateObservables).subscribe({
      next: () => {
        this.showMessage('success', 'Éxito', 'Compra realizada con éxito');
        this.loadCartItems();
      },
      error: () => {
        this.showMessage('error', 'Error', 'Error al finalizar la compra');
        this.loading = false;
      }
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
