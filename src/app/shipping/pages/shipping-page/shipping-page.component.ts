import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../services/shipping.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { ShippingFormComponent } from '../../components/shipping-form/shipping-form.component';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-shipping-page',
  imports: [CommonModule, CardModule, MessageModule, ShippingFormComponent, Dialog, ButtonModule],
  templateUrl: './shipping-page.component.html',
  styleUrl: './shipping-page.component.css'
})
export class ShippingPageComponent implements OnInit{

  shippingByType: any[] = [];

  dialogShippin: boolean = false;

  constructor(private shippingService: ShippingService, private auth: AuthenticationService){}

  showDialogShipping(): void{
    this.dialogShippin = true
  }

  ngOnInit(): void {

    this.auth.currentUserRole.subscribe((response: string)=> {

      if(response === 'ROLE_CLIENT'){
        this.shippingService.getShippingsByType('user').subscribe((response: any)=> {
          this.shippingByType = response;
        })

      }else if(response === 'ROLE_TECHNICIAN'){
        this.shippingService.getShippingsByType('technical').subscribe((response: any)=> {
          this.shippingByType = response;
        })
      }

    })    

  }

}
