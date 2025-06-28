import {Injectable} from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {catchError, Observable, retry} from 'rxjs';
import {Schedule} from '../model/schedule.entity';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService extends BaseService<Schedule> {
  constructor(http: HttpClient ) {
    super(http);
    this.resourceEndpoint = '/schedules';
  }

  getProductById(id: number): Observable<Schedule> {
    return this.http.get<Schedule>(`${this.basePath}${this.resourceEndpoint}?id=${id}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}
