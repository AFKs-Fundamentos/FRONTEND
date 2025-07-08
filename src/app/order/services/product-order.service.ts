import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, retry} from 'rxjs';
import {ProductOrder} from '../model/product-order.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService extends BaseService<ProductOrder>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/productOrder';
  }
  getProductOrderById(id: number): Observable<ProductOrder> {
    return this.http.get<ProductOrder>(`${this.basePath}${this.resourceEndpoint}/${id}`,this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getProductOrderByUserClientId (userClientId: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.basePath}${this.resourceEndpoint}/userClientId/${userClientId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getProductOrderByUserClientIdAndStatus (userClientId: number, status: string): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.basePath}${this.resourceEndpoint}/userClientId/${userClientId}/status/${status}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getProductOrderLatestByUserClientId (userClientId: number): Observable<ProductOrder> {
    return this.http.get<ProductOrder>(`${this.basePath}${this.resourceEndpoint}/latest/${userClientId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
