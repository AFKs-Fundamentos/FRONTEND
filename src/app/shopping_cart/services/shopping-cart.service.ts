import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { ShoppingCart } from '../model/shopping-cart.entity';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService extends BaseService<ShoppingCart> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/shopping_carts';
  }

  getByStatusCartShoppingItemAndUserClientId(userClientId: number, statusCartShoppingItem: string): Observable<ShoppingCart[]> {
    const url = `${this.basePath}${this.resourceEndpoint}?user_client_id=${userClientId}&status_shopping_cart_item=${statusCartShoppingItem}`;
    return this.http.get<ShoppingCart[]>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
