import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.entity';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Card} from 'primeng/card';
import {CurrencyPipe, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {ProductItemService} from '../../../shopping_cart/services/product-item.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {ShoppingCartService} from '../../../shopping_cart/services/shopping-cart.service';
import {ProductItem} from '../../../shopping_cart/model/product-item.entity';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [Card, NgIf, CurrencyPipe, Button],
  providers: [MessageService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product: Product | undefined;
  userId: number = 0;
  currentUserRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private productItemService: ProductItemService,
    private authenticationService: AuthenticationService,
    private shoppingCartService: ShoppingCartService,
    private routerI: Router,
    private messageService: MessageService
  ) {
    this.authenticationService.currentUserRole.subscribe(
      (currentUserRole) => this.currentUserRole = currentUserRole,
    )
  }

  ngOnInit(): void {
    this.userId = this.authenticationService.getCurrentUserId;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe({
        next: (data) => {
          this.product = Array.isArray(data) ? data[0] : data;
        },
        error: (err) => {
          console.error('Error al obtener producto:', err);
        }
      });
    }
  }

  addToCart(product: Product): void {
    this.shoppingCartService.getShoppingCartByUserId(this.userId).subscribe({
      next: (cart) => {
        const newCartItem: ProductItem = {
          productId: product.id,
          productName: product.productName,
          productPrice: product.price,
          quantity: 1,
          statusCartShoppingItem: 'PENDING',
          shoppingCartId: cart.id !== undefined ? cart.id : 0
        };

        this.productItemService.create(newCartItem).subscribe({
          next: () => {
            this.showMessage('success', 'Éxito', 'Producto añadido al carrito');
            this.routerI.navigate(['/buys']);
          },
          error: (err) => {
            console.error('Error adding to cart:', err);
            this.showMessage('error', 'Error', 'No se pudo añadir al carrito');
          }
        });

      },
      error: (err) => {
        console.error('Error obteniendo el carrito:', err);
        this.showMessage('error', 'Error', 'No se pudo obtener el carrito');
      }
    });

  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }


}
