import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
errors : any = ['',null,undefined,'undefined','null'];
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {


    var token = localStorage.getItem('admin');
    if(this.errors.indexOf(token)==-1){
      return true;
    }else{
      this.router.navigate(['/signin'])
      return false;
    }
    
  }
}