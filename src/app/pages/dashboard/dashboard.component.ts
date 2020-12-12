import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { NotifiService } from '../../services/notifi/notifi.service';
import { ApiService } from '../../services/api/api.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import {MatTableDataSource} from  '@angular/material/table';
import { Router } from '@angular/router';
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  displayedColumns = [ 'store_name', 'email',  'price'  , 'discount'  , 'discount_type' , 'quantity', 'quantity_type','category','in_stock'];
 
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  displayedColumns1 = [ 'name', 'email',  'phone'  , 'orders'];
  dataSource1 = new MatTableDataSource<Element1>(ELEMENT_DATA1);

  source: LocalDataSource = new LocalDataSource();

  sellers:any;
  buyers:any;
  orders:any;
  products:any
  type:any;
  logged_data:any;
  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private noti:NotifiService,
              private api:ApiService,
              private service: SmartTableData,
              private router:Router){
              this.type = Number(localStorage.getItem('admin'));
              this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
              this.getDashboard()
              this.get_products();
              this. get_buyers();
  }
  new(){
    this.api.api('test','true').subscribe((result) => {
    console.log(result)
    });
     console.log('running')}

  ngOnDestroy() {
     
  }

    onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getDashboard(){
    this.api.api('dashboard', {type: this.type, _id: this.logged_data._id}).subscribe((result) => {
     console.log(result)
      this.sellers= result.noOfSellers ;
      this.buyers = result.noOfBuyers;
      this.orders =result.noOfOrders;
      this.products =result.noOfProducts;

     }, err => {
        
      this.noti.error('Unable to fetch chat, Please try again', 'Server Error');
    });
  }

  get_products(){
     
    this.api.api('getAllProducts',{type: this.type, _id: this.logged_data._id}).subscribe((result) => {
       
      if(result.status==1){
        this.dataSource = new MatTableDataSource(result.data);
      }else{
        this.dataSource = new MatTableDataSource([]);
      }

      }, err => {
          
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }

  get_buyers(){
     
    this.api.api('getAllUsers','').subscribe((result) => {

      this.dataSource1 = new MatTableDataSource(result);
      
      }, err => {
          
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }

  navigate(url){
    this.router.navigate([url])
  }

 


}

export interface Element 
{  
  store_name: string;
  email: string;
  price: string;
  discount: string;
  discount_type: string;
  quantity: string;
  quantity_type: string;
  category: string;
  in_stock: string;
  
  }
  const ELEMENT_DATA: Element[] = [
  
  ];

  export interface Element1 
{  
  name: string;
  email: string;
  phone: string;
  orders: string;
  status: string;
 
  
  }
  const ELEMENT_DATA1: Element1[] = [
  
  ];

