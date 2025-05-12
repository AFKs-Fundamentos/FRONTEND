import { Routes } from '@angular/router';
import {MeetingsComponent} from './meetings/components/meetings/meetings.component';
import {ServiceHistoryComponent} from './meetings/components/service-history/service-history.component';
import {RatingCardComponent} from './meetings/components/rating-card/rating-card.component';

export const routes: Routes = [

  { path: 'meetings', component: MeetingsComponent },
  { path: 'service-history', component: ServiceHistoryComponent },
  { path: 'ratings', component: RatingCardComponent },

];

