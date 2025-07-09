import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CardModule } from 'primeng/card';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.entity';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {ButtonModule,Button} from 'primeng/button';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {ProductItem} from '../../../shopping_cart/model/product-item.entity';
import {ProductItemService} from '../../../shopping_cart/services/product-item.service';
import {ShoppingCartService} from '../../../shopping_cart/services/shopping-cart.service';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {Tooltip} from 'primeng/tooltip';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CardModule, NgForOf, CurrencyPipe, Button, ButtonModule, Tooltip, DropdownModule, FormsModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  productData: Product[] = [];
  filteredProducts: Product[] = [];
  userId: number = 0;
  currentUserRole: string = '';

  searchTerm: string = '';
  selectedCategory: string = '';
  categories: string[] = [];

  constructor(
    private productService: ProductsService,
    private productItemService: ProductItemService,
    private authenticationService: AuthenticationService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.authenticationService.currentUserRole.subscribe(
      (currentUserRole) => this.currentUserRole = currentUserRole,
    )
  }

  ngOnInit() {
    this.userId = this.authenticationService.getCurrentUserId;
    this.loadProducts();
  }
  loadProducts() {
    this.productService.getProductsByStock().subscribe(
      (data: Product[]) => {
        this.productData = data;
        this.filteredProducts = [...this.productData];
        this.categories = [...new Set(this.productData.map(product => product.category))];
        console.log(this.productData);
      },
      (error: any) => {
        console.error('Error fetching products', error);
      }
    );
  }
  filterProducts() {
    this.filteredProducts = this.productData.filter(product => {
      // Filtro por término de búsqueda
      const matchesSearch = this.searchTerm === '' ||
          product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtro por categoría
      const matchesCategory = !this.selectedCategory ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
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
            this.router.navigate(['/buys']);
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




  seeDetail(product: Product): void {
    const productId = product.id;
    this.router.navigate(['/product-detail', productId]);
  }
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
