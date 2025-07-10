import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, retry} from 'rxjs';
import {AdvisoryOrder} from '../model/advisory-order.entity';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryOrderService extends BaseService<AdvisoryOrder>{

  constructor(http:HttpClient) {
    super(http);
    this.resourceEndpoint = '/advisoryOrder';
  }

  getAdvisoryOrderById (id: number): Observable<AdvisoryOrder> {
    return this.http.get<AdvisoryOrder>(`${this.basePath}${this.resourceEndpoint}/${id}`,this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAdvisoryOrderByUserTechnicalId (userTechnicalId: number): Observable<AdvisoryOrder[]> {
    return this.http.get<AdvisoryOrder[]>(`${this.basePath}${this.resourceEndpoint}/userTechnicalId/${userTechnicalId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAdvisoryOrderByUserTechnicalIdAndStatus (userTechnicalId: number, status: string): Observable<AdvisoryOrder[]> {
    return this.http.get<AdvisoryOrder[]>(`${this.basePath}${this.resourceEndpoint}/userTechnicalId/${userTechnicalId}/status/${status}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAdvisoryOrderByUserClientId (userClientId: number): Observable<AdvisoryOrder[]> {
    return this.http.get<AdvisoryOrder[]>(`${this.basePath}${this.resourceEndpoint}/userClientId/${userClientId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAdvisoryOrderByUserClientIdAndStatus (userClientId: number, status: string): Observable<AdvisoryOrder[]> {
    return this.http.get<AdvisoryOrder[]>(`${this.basePath}${this.resourceEndpoint}/userClientId/${userClientId}/status/${status}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
