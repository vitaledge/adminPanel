import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
 
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{
errors : any = ['',null,undefined,'undefined','null'];
  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {


    var token = localStorage.getItem('admin');
    if(this.errors.indexOf(token)==-1){
      this.router.navigate(['/pages/iot-dashboard'])
      return false;
    }else{
     
      return true;
    }
    
  }
}