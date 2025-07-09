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
import {ConfirmationService, MessageService} from 'primeng/api';
import { forkJoin } from 'rxjs';
import {ProductEditComponent} from '../../components/product-edit/product-edit.component';
import {InventoryEditComponent} from '../../components/inventory-edit/inventory-edit.component';
import {ProductAddComponent} from '../../components/product-add/product-add.component';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {ConfirmDialog} from 'primeng/confirmdialog';



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
    NgClass,
    ConfirmDialog
  ],
  templateUrl: './product-inventory.component.html',
  styleUrls: ['./product-inventory.component.css'],
  providers: [MessageService,ConfirmationService]
})
export class ProductInventoryComponent implements OnInit {
  userId: number = 0;
  productsInventory: ProductInventory[] = [];
  loading: boolean = true;
  displayEditModal: boolean = false;
  displayAddModal: boolean = false;
  selectedItem: ProductInventory | null = null;
  editMode: 'product' | 'inventory' = 'product';

  constructor(
    private productService: ProductsService,
    private inventoryService: InventoryService,
    private autheticationService: AuthenticationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userId = this.autheticationService.getCurrentUserId;
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    this.loading = true;

    console.log('ID de usuario:', this.userId);

    forkJoin({
      inventory: this.inventoryService.getInventoryByUserId(this.userId),
      products: this.productService.getAll()
    }).subscribe({
      next: ({ inventory, products }) => {
        console.log('Datos crudos - Inventario:', inventory);
        console.log('Datos crudos - Productos:', products);

        if (!inventory || !products) {
          console.error('Datos incompletos recibidos');
          this.productsInventory = [];
          this.loading = false;
          return;
        }

        this.productsInventory = inventory
          .filter((inv: Inventory) => {

            return inv.userTechnicalId === this.userId;
          })
          .map((inv: Inventory) => {

            const product = products.find((p: Product) => p.id === inv.productId);

            if (!product) {
              console.warn(`Producto no encontrado para inventory con productId: ${inv.productId}`);
              return null;
            }

            return {
              product: product,
              inventory: inv
            };
          })
          .filter((item): item is ProductInventory => item !== null);

        console.log('Datos combinados:', this.productsInventory);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.showMessage('error', 'Error', 'Error al cargar los datos');
        this.loading = false;
      }
    });
  }

  editItem(item: ProductInventory, mode: 'product' | 'inventory'): void {
    this.selectedItem = { ...item };
    this.editMode = mode;
    this.displayEditModal = true;
  }
confirmDelete(item: ProductInventory): void {
  this.confirmationService.confirm({
    message: '¿Estás seguro de que deseas eliminar este producto?',
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.deleteItem(item);
    }
  });
}
deleteItem(item: ProductInventory): void {
  this.productService.delete(item.product.id).subscribe({
    next: () => {
      this.productsInventory = this.productsInventory.filter(
        p => p.product.id !== item.product.id
      );
      this.showMessage('success', 'Eliminado', 'Producto e inventario eliminados correctamente');
    },
    error: () => {
      this.showMessage('error', 'Error', 'No se pudo eliminar el producto');
    }
  });
}

  handleSave(): void {
    this.displayEditModal = false;
    this.loadUserProducts();
  }


  handleProductAdded(): void {
    this.displayAddModal = false;
    this.loadUserProducts();
    this.showMessage('success', 'Éxito', 'Producto agregado correctamente');
  }
  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
