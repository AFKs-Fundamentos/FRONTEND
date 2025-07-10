import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
//
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { BaseRating } from '../model/rating.model';
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RatingsService extends BaseService<BaseRating>{
  constructor(http: HttpClient, private httpForRating: HttpClient, private auth: AuthenticationService) {
    super(http);
    this.resourceEndpoint = '/rating'
  }

  getAlltRatings(type: string): Observable<BaseRating>{
    return this.httpForRating.get<BaseRating>(`${this.basePath}${this.resourceEndpoint}/${type}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllMyRatings(type: string): Observable<BaseRating>{
    return this.httpForRating.get<BaseRating>(`${this.basePath}${this.resourceEndpoint}/${type}/user?userId=${ this.auth.getCurrentUserId }`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getRatingsByType(type: string, contextId: number): Observable<BaseRating> {
    return this.httpForRating.get<BaseRating>(`${this.basePath}${this.resourceEndpoint}/${type}/${type}?${type}Id=${ contextId }`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getRatingsByTechnical(type: string, contextId: number): Observable<BaseRating> {
    return this.httpForRating.get<BaseRating>(`${this.basePath}${this.resourceEndpoint}/${type}/technical?technicalId=${ contextId }`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createRating(item: any, type: string): Observable<BaseRating> {
    return this.http.post<BaseRating>(`${this.basePath}${this.resourceEndpoint}/${type}`, JSON.stringify(item), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
}
