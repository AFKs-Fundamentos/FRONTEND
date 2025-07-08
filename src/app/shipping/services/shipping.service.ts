import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Shipping } from '../model/shipping.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService extends BaseService<Shipping>{

  constructor(http: HttpClient, private auth: AuthenticationService) {
    super(http);
    this.resourceEndpoint = '/shipping'
  }

  getShippingsByType(type: string): Observable<Shipping>{
    return this.http.get<Shipping>(`${this.basePath}${this.resourceEndpoint}/${type}?${type}Id=${ this.auth.getCurrentUserId }`, this.httpOptions) //TODO
    .pipe(retry(2), catchError(this.handleError));
  }
}
