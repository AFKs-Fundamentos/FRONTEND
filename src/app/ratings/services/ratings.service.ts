import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RatingsService extends BaseService<RatingsService>{

  constructor(http: HttpClient, private httpForEnt: HttpClient) {
    super(http);
    this.resourceEndpoint = '/ratings';
  }

}
