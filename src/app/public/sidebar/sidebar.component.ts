import { Component } from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  options = [
    { path: '/meetings', title: 'Meetings', icon: 'pi pi-video',  },
    { path: '/Purchases', title: 'Compras', icon: 'pi pi-shopping-cart',  },
    { path: '/components', title: 'Componentes', icon: 'pi pi-desktop',  },
    { path: '/inventories', title: 'Inventario', icon: 'pi pi-warehouse',  },

  ];
}
