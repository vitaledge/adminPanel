import { Component } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { MENU_ITEMS_ADMIN,MENU_ITEMS_SELLER } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu:any;
  type:any = Number(localStorage.getItem('admin'));
  
  constructor(public events:EventsService){

  this.getEvent();

  }

    getEvent(){

    	 this.events.currentMessage.subscribe(message => {
    this.type = Number(localStorage.getItem('admin'));
      
      if(this.type == 1){
	  	this.menu = MENU_ITEMS_ADMIN;
	  }
	  else{
	  	this.menu = MENU_ITEMS_SELLER;
	  }


    	 })

     
  }
  
}
