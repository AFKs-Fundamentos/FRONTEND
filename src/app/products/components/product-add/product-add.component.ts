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
import {DropdownModule} from 'primeng/dropdown';


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
    FloatLabelModule,
    DropdownModule
  ],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [MessageService]
})
export class ProductAddComponent {
  @Input() userId: number = 0;
  @Output() productAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  categories: string[] = ['CPU', 'GPU', 'RAM', 'MOTHERBOARD', 'STORAGE', 'POWER_SUPPLY', 'COOLING', 'OPTICAL_DRIVE', 'SOUND_CARD', 'NETWORK_CARD', 'EXPANSION_CARD', 'MONITOR', 'KEYBOARD', 'MOUSE', 'WEBCAM', 'HEADSET', 'PRINTER', 'SCANNER', 'CASE', 'CABLES', 'UPS', 'THERMAL_PASTE', 'MOUNTS', 'EXTERNAL_STORAGE', 'LAPTOP_CHARGER', 'DOCKING_STATION', 'BUNDLE', 'OTHER'];
  categoryOptions = this.categories.map(cat => ({ label: cat, value: cat }));
  product: Product = new Product();
  loading = false;
  initialStockValues = {
    stock: 1,
    stockMin: 5,
    stockMax: 50
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


    console.log(this.product.id);
    const  productData = {
      productName : this.product.productName,
      photo: this.product.photo,
      sku: this.product.sku,
      category: this.product.category,
      price: this.product.price,
      description: this.product.description
    };
    console.log('Datos de producto a agregar',productData);

    this.productService.create(productData).subscribe({
      next: (createdProduct: Product) => {
        const newInventory: Inventory = {
          userTechnicalId: this.userId,
          productId: createdProduct.id!,
          stock: this.initialStockValues.stock,
          stockMin: this.initialStockValues.stockMin,
          stockMax: this.initialStockValues.stockMax
        };

        this.inventoryService.create(newInventory).subscribe({
          next: () => {
            this.showMessage('success', 'Éxito', 'Producto e inventario creados correctamente');
            this.productAdded.emit();
            this.resetForm(form);
          },
          error: (err) => {
            console.error('Error creating inventory:', err);
            this.showMessage('error', 'Error', 'Producto creado pero error al crear inventario');
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error creating product:', err);
        this.showMessage('error', 'Error', 'Error al crear el producto');
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
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
