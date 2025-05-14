import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {Rating} from "primeng/rating";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ratings-page',
  imports: [
    Button,
    Card,
    Rating,
    FormsModule,
  ],
  templateUrl: './ratings-page.component.html',
  styleUrl: './ratings-page.component.css'
})
export class RatingsPageComponent {

  question: string = '¿Cuántas estrellas le darías al servicio de asesoría que recibiste?';
  type: boolean = true;
  type2: boolean = false;
  rating: number = 4;
  submitted: boolean = false;

  OnSubmit() {
    console.log('Rating submitted:', this.rating);
    this.submitted = true;
  }

}
