import { Component, Input, OnInit } from '@angular/core';
import { RatingsService } from '../../services/ratings.service';
import { RatingCardComponent } from '../rating-card/rating-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ratings-by-context',
  imports: [RatingCardComponent, CommonModule],
  templateUrl: './ratings-by-context.component.html',
  styleUrl: './ratings-by-context.component.css'
})
export class RatingsByContextComponent implements OnInit{

  ratingsByType: any[];
  @Input() context: string;
  @Input() contextId: any;

  constructor(private ratingServie: RatingsService){
    this.ratingsByType = [];
    this.context = '';
  }

  ngOnInit(): void {

    if(this.context === 'user'){

      this.ratingServie.getRatingsByTechnical(this.context, this.contextId).subscribe((response: any)=> {
      this.ratingsByType = response;
      console.log("ratings data:", this.ratingsByType);
    })

    }else {

      this.ratingServie.getRatingsByType(this.context, this.contextId).subscribe((response: any)=> {
      this.ratingsByType = response;
      console.log("ratings data:", this.ratingsByType)
    })

    }

  }

}
