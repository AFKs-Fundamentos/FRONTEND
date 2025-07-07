import { Injectable } from '@angular/core';
import { AdvisoryOrder } from '../model/advisoryOrder.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdvisoryOrderService extends BaseService<AdvisoryOrder>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/advisoryOrder';
    }

}
