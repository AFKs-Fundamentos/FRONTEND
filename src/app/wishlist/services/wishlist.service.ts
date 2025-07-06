import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Wishlist } from '../model/wishlist.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { AuthenticationService } from '../../iam/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends BaseService<Wishlist>{

  constructor(http: HttpClient, private httpToWishList: HttpClient, private auth: AuthenticationService) {
    super(http);
    this.resourceEndpoint = '/wishlist'
  }

  getAlltWishlist(): Observable<Wishlist>{
    return this.httpToWishList.get<Wishlist>(`${this.basePath}${this.resourceEndpoint}/user?userId=${2}`, this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
  }
   
}
