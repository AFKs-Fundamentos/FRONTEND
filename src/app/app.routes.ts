import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";

import {MeetingsComponent} from './meetings/components/meetings/meetings.component';
import {ServiceHistoryComponent} from './meetings/components/service-history/service-history.component';
import {RatingCardComponent} from './meetings/components/rating-card/rating-card.component';
import {RatingsPageComponent} from './ratings/pages/ratings-page/ratings-page.component'
import {roleGuard} from './shared/services/role.guard';
import {guestGuard} from './shared/services/guest.guard';
import {HomeComponent} from './public/pages/home/home.component';
import {ProductListComponent} from './products/pages/product-list/product-list.component';
import {ProductDetailComponent} from './products/components/product-detail/product-detail.component';
import {ProductInventoryComponent} from './products/pages/product-inventory/product-inventory.component';
//import {MeetingsComponent} from './meetings/components/meetings/meetings.component';

import {ShoppingCartComponent} from './shopping_cart/pages/shopping-cart/shopping-cart.component';
import {EditProfileComponent} from './profiles/components/edit-profile/edit-profile.component';
import {ProfilesPageComponent} from './profiles/pages/profiles-page/profiles-page.component';
import { WishListComponent } from './wishlist/pages/wish-list/wish-list.component';
import { MyRatingsPageComponent } from './ratings/pages/my-ratings-page/my-ratings-page.component';
import { ShippingPageComponent } from './shipping/pages/shipping-page/shipping-page.component';


export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'home', component: HomeComponent, canActivate: [authenticationGuard]},
  { path: 'meetings', component: MeetingsComponent},
  { path: 'service-history', component: ServiceHistoryComponent, canActivate: [authenticationGuard] },
  { path: 'ratings', component: RatingsPageComponent, canActivate: [authenticationGuard] },
  { path: 'wishlist', component: WishListComponent },
  { path: 'my-ratings', component: MyRatingsPageComponent },
  { path: 'shipping', component: ShippingPageComponent },
  { path: 'inventories', component: ProductInventoryComponent},
  {path: 'products',component: ProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'buys', component: ShoppingCartComponent},
  {path: 'product-inventory',component: ProductInventoryComponent},
  {path: 'profile',component: EditProfileComponent, canActivate: [roleGuard], data : { expectedRole: 'ROLE_TECHNICIAN' }},
  {path: 'my-profile',component: ProfilesPageComponent, canActivate: [roleGuard], data : { expectedRole: 'ROLE_TECHNICIAN' }},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  {path: 'service-history', component: ServiceHistoryComponent },
  {path: 'ratings', component: RatingCardComponent },
];

