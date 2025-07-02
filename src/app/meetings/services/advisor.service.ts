import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Advisor} from '../../profiles/model/advisor.entity';


@Injectable()
export class AdvisorService extends BaseService<Advisor>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/profiles';
  }
}
