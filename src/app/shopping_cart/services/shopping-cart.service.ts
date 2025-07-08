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
    this.resourceEndpoint = '/shopping';
  }

  getByUserClientIdAndStatus(userClientId: number, statusCartShopping: string): Observable<ShoppingCart[]> {
    const url = `${this.basePath}${this.resourceEndpoint}/user/${userClientId}/status/${statusCartShopping}`;
    return this.http.get<ShoppingCart[]>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getShoppingCartByUserId(userId: number): Observable<ShoppingCart> {
    const url = `${this.basePath}${this.resourceEndpoint}/user/${userId}`;
    return this.http.get<ShoppingCart>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


}
