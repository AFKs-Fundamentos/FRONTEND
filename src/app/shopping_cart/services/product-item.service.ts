import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ProductItem } from '../model/product-item.entity';
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductItemService extends BaseService<ProductItem>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/productItems';
  }



}
