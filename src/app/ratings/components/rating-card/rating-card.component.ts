import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { UserService } from '../../../iam/services/user.service';


@Component({
  selector: 'app-rating-card',
  imports: [Card, RatingModule, FormsModule, CommonModule],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.css'
})
export class RatingCardComponent {
  @Input() ratings: any;
  @Input() type: String;
  @Input() show: boolean;

  name: string;

  constructor(private userService: UserService){
    this.ratings = {};
    this.type = '';
    this.show = true;
    this.name = '';
  }

  protected getUserName(id: number): string{
    this.userService.getById(id).subscribe((response: any)=> {
      this.name = response.name;
      console.log("ratings data:", this.name);
    })
    return this.name
  }

}
