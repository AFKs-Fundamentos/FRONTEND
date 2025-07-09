import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { ProductsService } from '../../../products/services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-wish-list',
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit{

  wishListUser: any[] = [];
  productList: any[] = [];
  wishProductIds: Set<number> = new Set<number>();
  wishListProducts: any[] = [];
  quantity: number = 0;
  

  constructor(private wishListService: WishlistService, private productService: ProductsService){  }
  
  ngOnInit(): void {
    
    this.wishListService.getAlltWishlist().subscribe((response: any)=> {
      this.wishListUser = response;
      
      this.wishProductIds = new Set(this.wishListUser.map(item => item.productId));
      
      this.productService.getAll().subscribe((response: any)=> {
        this.productList = response;
        
        this.wishListProducts = this.productList.filter(product => this.wishProductIds.has(product.id))
        this.quantity = this.wishListProducts.length

      });

    });

  }

  removeFromWishList(productId: number): void {
    this.wishListProducts = this.wishListProducts.filter(
      product => product.id !== productId
    );
    this.quantity = this.wishListProducts.length
    console.log("Producto eliminado:", this.wishListProducts);
  }

}