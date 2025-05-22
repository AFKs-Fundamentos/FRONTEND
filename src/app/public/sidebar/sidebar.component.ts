import {Component, OnInit} from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {Ripple} from 'primeng/ripple';
import { AuthenticationSectionComponent } from "../../iam/components/authentication-section/authentication-section.component";
import {AuthenticationService} from "../../iam/services/authentication.service";

@Component({
  selector: 'app-sidebar',
  imports: [AvatarModule, ButtonModule, RouterLink, Menu, Ripple],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  currentUserName: string = '';
  role: string = '';
  currentUserRole: string = '';
  isSignedIn: boolean = false;

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

    this.currentUserRole=="ROLE_TECHNICIAN" ? this.role = "TÉCNICO" : this.role = "CLIENTE";

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
            path: 'service-history'
          },
          {
            label: 'Ratings',
            icon: 'pi pi-star',
            path: 'ratings'
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
            path: '/',
            command: () => {
              this.onSignOut();
            }
          }
        ]
      },
      {
        separator: true
      }
    ];
  }


  onSignOut() {
    // Sign out the user.
    this.authenticationService.signOut();
  }




}
