import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {SidebarComponent} from './public/sidebar/sidebar.component';
import {Button} from 'primeng/button';
import {ProductInventoryComponent} from './products/pages/product-inventory/product-inventory.component';
import { AuthenticationSectionComponent } from "./iam/components/authentication-section/authentication-section.component";
import {AuthenticationService} from './iam/services/authentication.service';
import {Drawer} from 'primeng/drawer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, Button, ProductInventoryComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PCMASTER';

  isSignedIn: boolean = false;

  constructor( private authenticationService: AuthenticationService) {

    this.authenticationService.isSignedIn.subscribe(
      (isSignedIn) => this.isSignedIn = isSignedIn
    );
  }

}
