import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';
import { Payment } from '../model/payment.entity';
@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService<Payment>{

  constructor(http: HttpClient) {
        super(http);
        this.resourceEndpoint = '/payments';
  }

  confirm(id:string): Observable<string> {
    return this.http.post<string>(`${this.basePath}${this.resourceEndpoint}/confirm/${id}`,{})
      .pipe(retry(2), catchError(this.handleError));
  }
  cancel(id:string): Observable<string> {
    return this.http.post<string>(`${this.basePath}${this.resourceEndpoint}/cancel/${id}`,{})
      .pipe(retry(2), catchError(this.handleError));
  }
}
