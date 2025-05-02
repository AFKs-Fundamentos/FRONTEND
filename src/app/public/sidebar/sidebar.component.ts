import {Component, OnInit} from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {Ripple} from 'primeng/ripple';

@Component({
  selector: 'app-sidebar',
  imports: [Toolbar, AvatarModule, ButtonModule, RouterLink, Menu, Ripple],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        label: 'General',
        items: [
          {
            label: 'Meetings',
            icon: 'pi pi-video',
            path: '/meetings'
          },
          {
            label: 'Service History',
            icon: 'pi pi-history',
            path: 'history-services'
          },
          {
            label: 'Products',
            icon: 'pi pi-desktop',
            path: '/products'
          },
          {
            label: 'My Buys',
            icon: 'pi pi-shopping-cart',
            path: '/buys'
          },

        ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog',
            path: '/'
          },
          {
            label: 'Help',
            icon: 'pi pi-inbox',
            path: '/'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            path: '/'
          }
        ]
      },
      {
        separator: true
      }
    ];
  }
}
