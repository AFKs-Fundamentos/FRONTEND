import { Injectable } from '@angular/core';
import {Advisor} from '../model/advisor.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AdvisorService extends BaseService<Advisor>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/advisors';
  }
}
