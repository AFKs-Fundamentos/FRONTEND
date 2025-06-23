import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../model/product.entity';
import { Inventory } from '../../model/inventory.entity';
import { CardModule } from 'primeng/card';
import { FormsModule, NgForm } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import {InputText} from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    InputText,
    FloatLabelModule
  ],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [MessageService]
})
export class ProductAddComponent {
  @Input() userId: number = 0;
  @Output() productAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  product: Product = new Product();
  loading = false;
  initialStockValues = {
    stock: 1,
    stock_min: 5,
    stock_max: 50
  };

  constructor(
    private productService: ProductsService,
    private inventoryService: InventoryService,
    private messageService: MessageService
  ) { }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormControlsAsTouched(form);
      return;
    }

    this.loading = true;


    this.productService.create(this.product).subscribe({
      next: (createdProduct: Product) => {
        const newInventory: Inventory = {
          user_technical_id: this.userId,
          product_id: createdProduct.id,
          stock: this.initialStockValues.stock,
          stock_min: this.initialStockValues.stock_min,
          stock_max: this.initialStockValues.stock_max
        };

        this.inventoryService.create(newInventory).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto e inventario creados correctamente'
            });
            this.productAdded.emit();
            this.resetForm(form);
          },
          error: (err) => {
            console.error('Error creating inventory:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Producto creado pero error al crear inventario'
            });
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al crear el producto'
        });
        this.loading = false;
      }
    });
  }

  private markFormControlsAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
  }

  private resetForm(form: NgForm): void {
    form.reset();
    this.product = new Product();
    this.loading = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
