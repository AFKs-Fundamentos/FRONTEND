import { Component, OnInit } from '@angular/core';
import { ShippingService } from '../../services/shipping.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { Shipping } from '../../model/shipping.model';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-shipping-form',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, FormsModule, TextareaModule, ButtonModule, InputGroupModule, InputGroupAddonModule, SelectModule, InputNumberModule, CardModule],
  templateUrl: './shipping-form.component.html',
  styleUrl: './shipping-form.component.css'
})
export class ShippingFormComponent implements OnInit{

  shippingForm: FormGroup;

  randomTracking: string = '';

  districts = [
    { name: 'Miraflores', value: 'Miraflores' },
    { name: 'Barranco', value: 'Barranco' },
    { name: 'San Martín de Porres', value: 'San Martín de Porres' },
    { name: 'Ate', value: 'Ate' },
    { name: 'Comas', value: 'Comas' },
    { name: 'Carabayllo', value: 'Carabayllo' },
    { name: 'Villa El Salvador', value: 'Villa El Salvador' },
    { name: 'Santiago de Surco', value: 'Santiago de Surco' },
    { name: 'Puente Piedra', value: 'Puente Piedra' },
    { name: 'San Juan de Miraflores', value: 'San Juan de Miraflores' },
  ];

  carrierOptions = [
    { name: 'Olva Courier', value: 'Olva Courier' },
    { name: 'KCRCourier', value: 'KCRCourier' },
    { name: 'Moova', value: 'Moova' },
    { name: 'DHL', value: 'DHL' },
  ];

  constructor(private fb: FormBuilder, private shippingService: ShippingService, private auth: AuthenticationService){
    this.shippingForm = this.fb.group({
      recipientName: [''],
      city: [''],
      postalCode: ['12345'],
      shippingCost: [10],
      trackingNumber: [''],
      carrier: [''],
      shippingEstimatedArrival: [2],
      address: [''],
      userId: [this.auth.getCurrentUserId],
      technicalId: [1]
    });
  }
  

  generateTracking(): string {
    const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
    return `PCMASTER-TRACK-${randomStr}`;
  }

  createShipping(): void{
    console.log("Este form es valio?: ", this.shippingForm.valid)


    if(this.shippingForm.valid){

      this.shippingForm.patchValue({ trackingNumber: this.randomTracking });

      const shippingCreated: Shipping = this.shippingForm.value;

      console.log('ESTO ES PARA PROBAR', this.shippingForm.value)
      
      this.shippingService.create(shippingCreated).subscribe({
        next: (res) => {
          console.log('Shipping creado:', res);
          this.shippingForm.reset();
        },
        error: (err) => {
          console.error('Error al crear rating:', err);
        }

      });

    } else {
      console.log('Formulario inválido');
    }
  }

  ngOnInit(): void {

    this.randomTracking = this.generateTracking();
    
    
  }

}
