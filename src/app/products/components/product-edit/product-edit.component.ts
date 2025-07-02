import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.entity';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Card} from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextarea,
    ButtonModule,
    Card,
    FloatLabelModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  @Input() product!: Product;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  loading: boolean = false;

  constructor(
    private productService: ProductsService,
    private messageService: MessageService
  ) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.markFormControlsAsTouched(form);
      return;
    }

    this.loading = true;

    const productData = { ...this.product };

    this.productService.update(this.product.id, productData).subscribe({
      next: () => {
        this.showMessage('success', 'Éxito', 'Producto actualizado correctamente');
        this.save.emit();
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        this.showMessage('error', 'Error', 'No se pudo actualizar el producto');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  private markFormControlsAsTouched(form: NgForm): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].markAsTouched();
    });
  }
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
  onCancel(): void {
    this.cancel.emit();
  }
}
