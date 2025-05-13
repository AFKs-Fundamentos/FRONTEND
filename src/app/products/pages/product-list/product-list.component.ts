import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { CardModule } from 'primeng/card';
import {ProductsService} from '../../services/products.service';
import {Product} from '../../model/product.entity';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {ButtonModule,Button} from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CardModule, NgForOf, CurrencyPipe, Button, ButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  productData: Product[] = [];

  constructor(private productService: ProductsService, private router: Router) {}

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
  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
  }
  addToCart(product: Product): void {
    const productId = product.id;
    //console.log('Producto añadido al carrito con ID:', productId);
    // Aqui debajo llamas al servicio de carrito el que lo este haciendo ;)
  }
  seeDetail(product: Product): void {

    const productId = product.id;
    this.router.navigate(['/product-detail', productId]);


  }
}
