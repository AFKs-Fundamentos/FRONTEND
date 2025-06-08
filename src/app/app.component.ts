import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from './public/sidebar/sidebar.component';
import {Button} from 'primeng/button';
import {ProductInventoryComponent} from './products/pages/product-inventory/product-inventory.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, Button, ProductInventoryComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PCMASTER';
}
