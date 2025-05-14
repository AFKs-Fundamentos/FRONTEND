import { Routes } from '@angular/router';
import {ProductListComponent} from './products/pages/product-list/product-list.component';
import {ProductDetailComponent} from './products/components/product-detail/product-detail.component';
import {ProductInventoryComponent} from './products/pages/product-inventory/product-inventory.component';
//import {MeetingsComponent} from './meetings/components/meetings/meetings.component';

export const routes: Routes = [

 // { path: 'meetings', component: MeetingsComponent },
  {path: 'products',component: ProductListComponent},
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'product-inventory',component: ProductInventoryComponent},

];

