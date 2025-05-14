import { Routes } from '@angular/router';
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";


import {authenticationGuard} from "./iam/services/authentication.guard";
import {SignInComponent} from "./iam/pages/sign-in/sign-in.component";
import {SignUpComponent} from "./iam/pages/sign-up/sign-up.component";

import {MeetingsComponent} from './meetings/components/meetings/meetings.component';
import {ServiceHistoryComponent} from './meetings/components/service-history/service-history.component';
import {RatingCardComponent} from './meetings/components/rating-card/rating-card.component';

export const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: 'meetings', component: MeetingsComponent, canActivate: [authenticationGuard] },
  { path: 'service-history', component: ServiceHistoryComponent, canActivate: [authenticationGuard] },
  { path: 'ratings', component: RatingCardComponent, canActivate: [authenticationGuard] },
  { path: '', redirectTo: 'meetings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

