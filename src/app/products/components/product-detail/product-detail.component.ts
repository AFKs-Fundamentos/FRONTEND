import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.entity';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {Card} from 'primeng/card';
import {CurrencyPipe, NgIf} from '@angular/common';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [Card, NgIf, CurrencyPipe, Button],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getById(+id).subscribe({
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
    console.log('Producto añadido al carrito:', product.id);
  }

}
