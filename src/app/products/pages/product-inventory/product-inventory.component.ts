import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {InventoryService} from '../../services/inventory.service';
import {Product} from '../../model/product.entity';
import {TableModule} from 'primeng/table';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-inventory',
  imports: [
    TableModule,
    CurrencyPipe
  ],
  templateUrl: './product-inventory.component.html',
  styleUrl: './product-inventory.component.css'
})
export class ProductInventoryComponent implements  OnInit{

  userId: number = 1;
  userProducts: any[] = [];

  constructor(private productService: ProductsService,
              private inventoryService: InventoryService)
  { }

  ngOnInit(): void {
    this.loadUserProducts();
  }
  loadUserProducts(): void {
    this.inventoryService.getInventoryByUserId(this.userId).subscribe((inventory) => {
      this.productService.getAll().subscribe((products) => {
        this.userProducts = inventory.map((item: any) => {
          const product = products.find((p: Product) => p.id === item.product_id);
          return { ...product, stock: item.stock };
        });
      });
    });
  }
}
