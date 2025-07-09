import {Component, OnInit} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import {AuthenticationService} from "../../iam/services/authentication.service";

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, RouterLink, Menu, Ripple],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements  OnInit {
  currentUserName: string = '';
  role: string = '';
  currentUserRole: string = '';
  isSignedIn: boolean = false;
  collapsed = false;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUsername.subscribe(
        (username) => this.currentUserName = username
    );
    this.authenticationService.isSignedIn.subscribe(
        (isSignedIn) => this.isSignedIn = isSignedIn
    );
    this.authenticationService.currentUserRole.subscribe(
        (currentUserRole) => this.currentUserRole = currentUserRole,
    )
  }

  items: MenuItem[] | undefined;


  ngOnInit() {
    this.items = [
      {
        separator: true
      },
      {
        label: 'General',
        items: [
          {label: 'Home', icon: 'pi pi-home', path: '/home'},
          {label: 'Meetings', icon: 'pi pi-video', path: '/meetings'},
          {label: 'Service History', icon: 'pi pi-history', path: 'service-history'},
          {label: 'Ratings', icon: 'pi pi-star', path: '/ratings-page'},
          {label: 'Products', icon: 'pi pi-desktop', path: '/products'},
          {label: 'My Buys', icon: 'pi pi-shopping-cart', path: '/buys'},
        ]
      },
    ];
    this.currentUserRole=="ROLE_TECHNICIAN" ? this.role = "TÉCNICO" : this.role = "CLIENTE";
    if (this.currentUserRole == "ROLE_TECHNICIAN") {
      //menu para el técnico
      this.items = [
        { separator: true },
        { label: 'Home', icon: 'pi pi-home', path: '/home' },
        { label: 'Meetings', icon: 'pi pi-video', path: '/meetings' },
        { label: 'Service History', icon: 'pi pi-history', path: '/service-history' },
        { label: 'Ratings', icon: 'pi pi-star', path: '/ratings' },
        { label: 'Inventory', icon: 'pi pi-box', path: '/inventories' },
        { label: 'Products', icon: 'pi pi-desktop', path: '/products' },
        { label: 'Shipping', icon: 'pi pi-box', path: '/shipping' },
        { separator: true },
        { label: 'Settings', icon: 'pi pi-cog', path: '/settings' },
        { label: 'Help', icon: 'pi pi-inbox', path: '/help' },
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onSignOut() }
      ];
    } else {
      this.items = [
        { separator: true },
        { label: 'Home', icon: 'pi pi-home', path: '/home' },
        { label: 'Meetings', icon: 'pi pi-video', path: '/meetings' },
        { label: 'Service History', icon: 'pi pi-history', path: '/service-history' },
        { label: 'Ratings', icon: 'pi pi-star', path: '/ratings' },
        { label: 'Products', icon: 'pi pi-desktop', path: '/products' },
        { label: 'Wish List', icon: 'pi pi-heart', path: '/wishlist' },
        { label: 'My Buys', icon: 'pi pi-shopping-cart', path: '/buys' },
        { label: 'Product History', icon: 'pi pi-file', path: '/product-history' },
        { label: 'Shipping', icon: 'pi pi-box', path: '/shipping' },
        { separator: true },
        { label: 'Settings', icon: 'pi pi-cog', path: '/settings' },
        { label: 'Help', icon: 'pi pi-inbox', path: '/help' },
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onSignOut() }
      ];
    }

  }
  onSignOut() {
    // Sign out the user.
    this.authenticationService.signOut();
  }
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

}
