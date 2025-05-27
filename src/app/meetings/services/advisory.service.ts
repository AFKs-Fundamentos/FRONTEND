import { Injectable } from '@angular/core';
import { Advisory } from '../model/advisory.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';

@Injectable()
export class AdvisoryService extends BaseService<Advisory>{
    constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/advisories';
    }

  getAdvisoryByStatus(status: string): Observable<Advisory[]> {
    return this.http.get<Advisory[]>(`${this.basePath}${this.resourceEndpoint}/advisory/status/${status}`)
      .pipe(retry(2), catchError(this.handleError));
  }


}
