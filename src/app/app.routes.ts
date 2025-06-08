import { Routes } from '@angular/router';
import {ProductListComponent} from './products/pages/product-list/product-list.component';
import {ProductDetailComponent} from './products/components/product-detail/product-detail.component';
import {ProductInventoryComponent} from './products/pages/product-inventory/product-inventory.component';
//import {MeetingsComponent} from './meetings/components/meetings/meetings.component';
import {ServiceHistoryComponent} from './meetings/components/service-history/service-history.component';
import {RatingCardComponent} from './meetings/components/rating-card/rating-card.component';
import {ShoppingCartComponent} from './shopping_cart/pages/shopping-cart/shopping-cart.component';


export const routes: Routes = [

 // { path: 'meetings', component: MeetingsComponent },
  {path: 'products',component: ProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'shopping-cart/:user_client_id', component: ShoppingCartComponent},
  {path: 'product-inventory',component: ProductInventoryComponent},
  {path: 'service-history', component: ServiceHistoryComponent },
  {path: 'ratings', component: RatingCardComponent },
];

