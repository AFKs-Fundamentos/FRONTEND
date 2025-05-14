import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, retry} from 'rxjs';
import {Inventory} from '../model/inventory.entity';

@Injectable({
  providedIn: 'root'
})
export class InventoryService extends BaseService<Inventory>{

  constructor(http: HttpClient ) {
    super(http);
    this.resourceEndpoint = '/inventory';
  }
  getInventoryByUserId(userId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.basePath}${this.resourceEndpoint}?user_id=${userId}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}
