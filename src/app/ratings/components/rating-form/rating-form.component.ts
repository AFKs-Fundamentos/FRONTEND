import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Rating } from 'primeng/rating';
import { TextareaModule } from 'primeng/textarea';
import { RatingsService } from '../../services/ratings.service';

import { AdvisoryRating, ProductRating, UserRating } from '../../model/rating.model';
import { AuthenticationService } from '../../../iam/services/authentication.service';


@Component({
  selector: 'app-rating-form',
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, FormsModule, TextareaModule, ButtonModule, Rating],
  templateUrl: './rating-form.component.html',
  styleUrl: './rating-form.component.css'
})
export class RatingFormComponent {

  ratingForm: FormGroup;
  
  rating: any

  @Input() id: number;
  @Input() context: string;
  @Output() dialogClosed = new EventEmitter<void>();
  
  constructor(private fb: FormBuilder, private ratingService: RatingsService, private auth: AuthenticationService){
    this.ratingForm = this.fb.group({
      punctuation: [0, Validators.required],
      description: ['', [Validators.required, Validators.minLength(5)]],
      userId: this.auth.getCurrentUserId
    })

    this.id = 0;
    this.context = '';
  }

  CreateRating(): void{

    if(this.ratingForm.valid){
      
      switch(this.context){
        case 'product': {
          
          const formValue = this.ratingForm.value;

          const ratingP: ProductRating = {
            ...formValue,
            productId: this.id,
          };

          this.rating = ratingP

          break;
        
        }
        case 'advisory': {

          const formValue = this.ratingForm.value;

          const ratingA: AdvisoryRating = {
            ...formValue,
            advisoryId: this.id,
          };

          this.rating = ratingA

          break;
        }
        case 'user': {

          const formValue = this.ratingForm.value;

          const ratingU: UserRating = {
            ...formValue,
            technicalId: this.id,
          };

          this.rating = ratingU

          break;
        }
      }

      this.ratingService.createRating(this.rating, this.context).subscribe({
        next: (res) => {
          console.log('Rating creado:', res);
          this.ratingForm.reset({ punctuation: 0, description: '' });
          this.dialogClosed.emit();
        },
        error: (err) => {
          console.error('Error al crear rating:', err);
        }
      })

    } else {console.log('Rating invalido'), this.ratingForm.reset({ punctuation: 0, description: '' })}
  }

}
