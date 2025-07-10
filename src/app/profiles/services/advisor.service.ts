import { Injectable } from '@angular/core';
import {Advisor} from '../model/advisor.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable()
export class AdvisorService extends BaseService<Advisor>{

  profilePath: string = `${environment.serverBasePath}/profiles/profile`;


  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/profiles';
  }



}
