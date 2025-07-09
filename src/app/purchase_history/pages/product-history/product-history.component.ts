import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RouterLink} from '@angular/router';
import {ProductItem} from '../../../shopping_cart/model/product-item.entity';
import {ShoppingCart} from '../../../shopping_cart/model/shopping-cart.entity';
import {ShoppingCartService} from '../../../shopping_cart/services/shopping-cart.service';
import {ProductItemService} from '../../../shopping_cart/services/product-item.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';


@Component({
  selector: 'app-product-history',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputNumberModule,
    CurrencyPipe,
    FormsModule,
    ToastModule,
    ProgressSpinnerModule,
    RouterLink
  ],
  providers: [MessageService],
  templateUrl: './product-history.component.html',
  styleUrl: './product-history.component.css'
})
export class ProductHistoryComponent implements  OnInit {
  cartItems: ProductItem[] = [];
  currentCart?: ShoppingCart;
  loading: boolean = true;
  readonly PENDING_STATUS = 'COMPLETED';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
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
      this.showMessage('info', 'Información', 'No hay productos en el tú Historial de Compras');
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
    this.showMessage('error', 'Error', 'No se pudieron cargar los items de tu Historial de Compras');
    this.loading = false;
  }
  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.productPrice * item.quantity),
      0
    );
  }
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
