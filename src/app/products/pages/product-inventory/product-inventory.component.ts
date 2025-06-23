import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { InventoryService } from '../../services/inventory.service';
import { Product } from '../../model/product.entity';
import { Inventory } from '../../model/inventory.entity';
import { TableModule } from 'primeng/table';
import {CurrencyPipe, NgClass, NgIf} from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import {ProductEditComponent} from '../../components/product-edit/product-edit.component';
import {InventoryEditComponent} from '../../components/inventory-edit/inventory-edit.component';
import {ProductAddComponent} from '../../components/product-add/product-add.component';


interface ProductInventory {
  product: Product;
  inventory: Inventory;
}

@Component({
  selector: 'app-product-inventory',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    ProgressSpinnerModule,
    TooltipModule,
    CurrencyPipe,
    NgIf,
    ProductEditComponent,
    InventoryEditComponent,
    ProductAddComponent,
    NgClass
  ],
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css'],
  providers: [MessageService]
})
export class ProductInventoryComponent implements OnInit {
  userId: number = 1;
  productsInventory: ProductInventory[] = [];
  loading: boolean = true;
  displayEditModal: boolean = false;
  displayAddModal: boolean = false;
  selectedItem: ProductInventory | null = null;
  editMode: 'product' | 'inventory' = 'product';

  constructor(
    private productService: ProductsService,
    private inventoryService: InventoryService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    this.loading = true;

    forkJoin({
      inventory: this.inventoryService.getInventoryByUserId(this.userId),
      products: this.productService.getAll()
    }).subscribe({
      next: ({ inventory, products }) => {
        this.productsInventory = inventory.map((item: Inventory) => {
          const product = products.find((p: Product) => p.id === item.product_id);
          return product ? { product, inventory: item } : null;
        }).filter((item): item is ProductInventory => item !== null);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los datos'
        });
        this.loading = false;
      }
    });
  }

  editItem(item: ProductInventory, mode: 'product' | 'inventory'): void {
    this.selectedItem = { ...item };
    this.editMode = mode;
    this.displayEditModal = true;
  }

  handleSave(): void {
    this.displayEditModal = false;
    this.loadUserProducts();
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cambios guardados correctamente'
    });
  }

  handleProductAdded(): void {
    this.displayAddModal = false;
    this.loadUserProducts();
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Producto agregado correctamente'
    });
  }
}
