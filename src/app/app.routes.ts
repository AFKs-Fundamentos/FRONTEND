import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";


import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";

import {MeetingsComponent} from './meetings/components/meetings/meetings.component';
import {ServiceHistoryComponent} from './meetings/components/service-history/service-history.component';
import {RatingCardComponent} from './meetings/components/rating-card/rating-card.component';
import {roleGuard} from './shared/services/role.guard';
import {guestGuard} from './shared/services/guest.guard';
import {HomeComponent} from './public/pages/home/home.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent, },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'home', component: HomeComponent, canActivate: [authenticationGuard]},
  { path: 'meetings', component: MeetingsComponent, canActivate: [roleGuard], data : { expectedRole: 'ROLE_CLIENT' } },
  { path: 'service-history', component: ServiceHistoryComponent, canActivate: [authenticationGuard] },
  { path: 'ratings', component: RatingCardComponent, canActivate: [authenticationGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

