import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RatingsService } from '../../services/ratings.service';
import { CommonModule, NgForOf } from '@angular/common';
import { RatingCardComponent } from '../../components/rating-card/rating-card.component';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ratings-page',
  imports: [
    FormsModule,
    NgForOf,
    RatingCardComponent,
    CommonModule,
    TabsModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './ratings-page.component.html',
  styleUrl: './ratings-page.component.css'
})
export class RatingsPageComponent implements OnInit{

  question: string = '¿Cuántas estrellas le darías al servicio de asesoría que recibiste?';
  type: String = '';
  type2: boolean = false;
  rating: number = 4;
  submitted: boolean = false;

  allRatings: any[];
  selectedTab: string = '0';

  constructor(private ratingService: RatingsService){
    this.allRatings = [];
  }

  protected getAllRatings(forTab: string): void{
    this.ratingService.getAlltRatings(forTab).subscribe((response: any)=> {
      this.allRatings = response;
      console.log("ratings data:", this.allRatings)
    })
    
  }

  protected getByTab(): void{

    switch(this.selectedTab){
      case '0':
        this.getAllRatings('product')
        this.type = 'Producto';
        break;
      case '1':
        this.getAllRatings('advisory')
        this.type = 'Asesoramiento'
        break;
      case '2':
        this.getAllRatings('user')
        this.type = 'Tecnico'
        break;
    }

  }

  OnSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
    this.getByTab();
    this.selectedTab = '0';
  }

}
