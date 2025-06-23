import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-rating-card',
  imports: [Card, RatingModule, FormsModule],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.css'
})
export class RatingCardComponent {
  @Input() ratings: any;

  constructor(){
    this.ratings = {};
  }

}
