import { Injectable } from '@angular/core';
import { Advisory } from '../model/advisory.entity';
import {BaseService} from '../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, retry} from 'rxjs';
import {Appointment} from '../model/appointment.entity';

@Injectable()
export class AppointmentService extends BaseService<Appointment>{
    constructor(http: HttpClient) {
      super(http);
      this.resourceEndpoint = '/appointments';
    }

  putAppointmentByIdAndStatus(id: any, status:String): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.basePath}${this.resourceEndpoint}/${id}/status/${status}`)
      .pipe(retry(2), catchError(this.handleError));
  }


}
