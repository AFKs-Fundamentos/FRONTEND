import { Component, OnInit } from '@angular/core';
import { RatingsService } from '../../services/ratings.service';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { RatingCardComponent } from '../../components/rating-card/rating-card.component';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-my-ratings-page',
  imports: [CommonModule, TabsModule, RatingCardComponent, RouterLink, ButtonModule],
  templateUrl: './my-ratings-page.component.html',
  styleUrl: './my-ratings-page.component.css'
})
export class MyRatingsPageComponent implements OnInit{

  myRatings: any[];
  selectedTab: string = '0';
  show: boolean = false;

  constructor(private ratingService: RatingsService){
    this.myRatings = [];
  }

  protected getMyRatings(forTab: string): void{
    this.ratingService.getAllMyRatings(forTab).subscribe((response: any)=> {
      this.myRatings = response;
      console.log("ratings data:", this.myRatings)
    })
  }

  protected getByTab(): void{
    
    switch(this.selectedTab){
      case '0':
        this.getMyRatings('product')
        break;
      case '1':
        this.getMyRatings('advisory')
        break;
      case '2':
        this.getMyRatings('user')
        break;
    }
  }

  ngOnInit(): void {
    this.getByTab();
    this.selectedTab = '0';
  }

}
