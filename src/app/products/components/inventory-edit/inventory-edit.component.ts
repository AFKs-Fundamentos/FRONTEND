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
      stockMin: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      stockMax: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inventory'] && this.inventory) {
      this.inventoryForm.patchValue({
        id: this.inventory.id,
        stockMin: this.inventory.stockMin,
        stock: this.inventory.stock,
        stockMax: this.inventory.stockMax
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
        console.log('Inventario actualizado correctamente:', updatedInventory);
        this.showMessage('success', 'Éxito', 'Inventario actualizado correctamente');
        this.save.emit();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al actualizar inventario:', err);
        this.showMessage('error', 'Error', 'No se pudo actualizar el inventario');
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
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
