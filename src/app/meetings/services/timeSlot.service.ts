import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { AdvisorSchedule } from '../model/advisorSchedule.entity';
import { BaseService } from '../../shared/services/base.service';

@Injectable()
export class TimeSlotService extends BaseService<AdvisorSchedule> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/TimeSlots';
  }

  putTimeSlot(id: number, free: boolean): Observable<AdvisorSchedule> {
    const body = {
      id,
      free
    };

    return this.http.put<AdvisorSchedule>(
      `${this.basePath}${this.resourceEndpoint}/${id}/availability`,
      body
    ).pipe(
      retry(2),
      catchError(this.handleError.bind(this))
    );
  }
}
