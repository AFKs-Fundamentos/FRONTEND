import {Injectable} from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Product } from "../model/product.entity";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product>
{
  constructor(http: HttpClient ) {
    super(http);
    this.resourceEndpoint = '/products';
  }


}
