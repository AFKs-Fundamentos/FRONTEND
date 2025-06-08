import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CardModule } from 'primeng/card';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.entity';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {ButtonModule,Button} from 'primeng/button';
import {Router} from '@angular/router';
import {ShoppingCartService} from '../../../shopping_cart/services/shopping-cart.service';
import {ShoppingCart} from '../../../shopping_cart/model/shopping-cart.entity';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CardModule, NgForOf, CurrencyPipe, Button, ButtonModule],
  providers: [MessageService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  userClientId: number = 100;
  productData: Product[] = [];

  constructor(
    private productService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getAll().subscribe(
      (data: Product[]) => {
        this.productData = data.map(product => ({ ...product, isFavorite: false }));
        console.log(this.productData);
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );
  }

  addToCart(product: Product): void {
    const newCartItem: ShoppingCart = {
      user_client_id: this.userClientId,
      product_id: product.id,
      product_name: product.productName,
      product_price: product.price,
      product_quantity: 1, // Cantidad inicial siempre 1
      status_shopping_cart_item: 'PENDING' // Estado inicial
    };

    this.shoppingCartService.create(newCartItem).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Producto añadido al carrito'
        });
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo añadir al carrito'
        });
      }
    });
    this.router.navigate(['/shopping-cart', this.userClientId]);
  }
  seeDetail(product: Product): void {
    const productId = product.id;
    this.router.navigate(['/product-detail', productId]);
  }
}
