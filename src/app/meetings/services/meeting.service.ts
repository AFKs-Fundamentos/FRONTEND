import { Injectable } from '@angular/core';
import { Meeting } from '../model/meeting.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MeetingService extends BaseService<Meeting>{
    constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/meetings';
    }

}
