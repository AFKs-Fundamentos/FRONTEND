import { Component } from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {Rating} from "primeng/rating";
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-rating-card',
  imports: [
    Button,
    Card,
    Rating,
    FormsModule
  ],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.css'
})
export class RatingCardComponent {

  question: string = '¿Cuántas estrellas le darías al servicio de asesoría que recibiste?';
  rating: number = 0;
  ratingValue: number = 0;
  submitted: boolean = false;

  OnSubmit() {
    console.log('Rating submitted:', this.ratingValue);
    this.submitted = true;
  }
}
