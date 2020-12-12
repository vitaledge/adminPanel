import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SigninComponent} from '../app/signin/signin.component';
import { ForgotpasswordComponent} from '../app/forgotpassword/forgotpassword.component';
import { LoginGuardService} from '../app/services/login/login-guard.service';

import { AuthGuardService} from '../app/services/admin/auth-guard.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
      canActivate: [AuthGuardService]
      
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [LoginGuardService]
 
  },
  {
    path: 'forgotpassword',
    component: ForgotpasswordComponent,
    canActivate: [LoginGuardService]
 
  },
  { path: '', redirectTo: '/pages/iot-dashboard', pathMatch: 'full', canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'pages' },
];  

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
