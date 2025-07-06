import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { WishlistService } from '../../services/wishlist.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { Wishlist } from '../../model/wishlist.model';

@Component({
  selector: 'app-add-wishlist-button',
  imports: [ButtonModule, InputTextModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {

  @Input() productId: number;
  id: number;

  constructor(private wishListService: WishlistService, private auth: AuthenticationService){
    this.productId = -1;
    this.id = -1;
  }

  AddWishList(): void{

    this.id = this.auth.getCurrentUserId

    const wishlist: Wishlist = {
      userId: this.id,
      productId: this.productId
    }
    console.log('user ID para revisar:', wishlist.userId);
    console.log('user ID para revisar:', wishlist);

    this.wishListService.create(wishlist).subscribe({
      next: (res) => {
        console.log('Wishlist creado:', res);
      },
      error: (err) => {
        console.error('Error al agregar en wishlist:', err);
      }
    })

  }

}
