import {Injectable} from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/product.entity";
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
  constructor(http: HttpClient ) {
    super(http);
    this.resourceEndpoint = '/products';
  }

<<<<<<< HEAD

  override getById(id: number): Observable<Product> {
=======
  getProductById(id: number): Observable<Product> {
>>>>>>> origin/feature-product
    return this.http.get<Product>(`${this.basePath}${this.resourceEndpoint}?id=${id}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}
