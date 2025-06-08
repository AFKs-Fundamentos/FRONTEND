import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Inventory } from '../../model/inventory.entity';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule
  ],
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css']
})
export class InventoryEditComponent {
  @Input() inventory!: Inventory;
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  inventoryForm: FormGroup;
  loading = false;

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.inventoryForm = this.fb.group({
      id: [{value: '', disabled: true}],
      stock_min: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      stock_max: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inventory'] && this.inventory) {
      this.inventoryForm.patchValue({
        id: this.inventory.id,
        stock_min: this.inventory.stock_min,
        stock: this.inventory.stock,
        stock_max: this.inventory.stock_max
      });
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    this.loading = true;
    const updatedInventory: Inventory = {
      ...this.inventory,
      ...this.inventoryForm.getRawValue()
    };

    this.inventoryService.update(updatedInventory.id, updatedInventory).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Inventario actualizado correctamente'
        });
        this.save.emit();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al actualizar inventario:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el inventario'
        });
        this.loading = false;
      }
    });
  }

  private markFormControlsAsTouched(): void {
    Object.values(this.inventoryForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
