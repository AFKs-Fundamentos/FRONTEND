import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, catchError } from 'rxjs';
import { BaseService } from '../../shared/services/base.service';
import { AdvisorSchedule } from '../../meetings/model/advisorSchedule.entity';

@Injectable({
  providedIn: 'root'
})
export class SchedulingService extends BaseService<AdvisorSchedule> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/schedules';
  }

  getScheduleByAdvisorId(advisorId: number): Observable<AdvisorSchedule[]> {
    return this.http.get<AdvisorSchedule[]>(
      `${this.basePath}${this.resourceEndpoint}/advisor/${advisorId}`,
      this.httpOptions
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }
}
