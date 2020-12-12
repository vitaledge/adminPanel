import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuyerComponent } from './buyer/buyer.component';
import { AddbuyerComponent } from './buyer/addbuyer/addbuyer.component';
import { SellerComponent } from './seller/seller.component';
import { AddsellerComponent } from './seller/addseller/addseller.component';
import { ProductComponent } from './product/product.component';
import { DriverComponent } from './driver/driver.component';
import { AdddriverComponent } from './driver/adddriver/adddriver.component';
import { EditdriverComponent } from './driver/editdriver/editdriver.component';
import { CouponsComponent } from './coupons/coupons.component';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { EditsellerComponent } from './seller/editseller/editseller.component';
import { TransactionComponent } from './transaction/transaction.component';
import { OrderComponent } from './order/order.component';
import { ManageorderComponent } from './order/manageorder/manageorder.component';
import { SettingsComponent } from './settings/settings.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AuthGuardService} from '../services/admin/auth-guard.service';

import { ExtrasComponent } from './extras/extras.component';
import { EditextrasComponent } from './extras/editextras/editextras.component';
import { AddextrasComponent } from './extras/addextras/addextras.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'coupons',
      component: CouponsComponent,
    },
    {
      path: 'settings',
      component: SettingsComponent,
    },
    {
      path: 'transaction',
      component: TransactionComponent,
    },
    {
      path: 'order',
      component: OrderComponent,
    },
    {
      path: 'driver',
      component: DriverComponent,
    },
    {
      path: 'adddriver',
      component: AdddriverComponent,
    },
    {
      path: 'editdriver/:id',
      component: EditdriverComponent,
    },


    {
      path: 'extras',
      component: ExtrasComponent,
    },
    {
      path: 'addextras',
      component: AddextrasComponent,
    },
    {
      path: 'editextras/:id',
      component: EditextrasComponent,
    },

    {
      path: 'manageorder/:id',
      component: ManageorderComponent,
    },

    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'addproduct',
      component: AddproductComponent,
    },
    {
      path: 'editproduct/:id',
      component: EditproductComponent,
    },
    {
      path: 'editseller/:id',
      component: EditsellerComponent,
    },
    {
      path: 'seller',
      component: SellerComponent,
    },
    {
      path: 'addseller',
      component: AddsellerComponent,
    },
    {
      path: 'addbuyer',
      component: AddbuyerComponent,
    },
    {
      path: 'buyer',
      component: BuyerComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService]
    },
 
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
