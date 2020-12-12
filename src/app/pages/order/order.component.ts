import { Component, Input,OnInit, ChangeDetectorRef } from '@angular/core';
import { NotifiService } from '../../services/notifi/notifi.service';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatTableDataSource} from  '@angular/material/table';
import { config } from './../../config';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
 
  displayedColumns = ['store', 'OrderNumber', 'status', 'orderMode', 'placedDateTime', 'date',  'time', 'store_name', 'email',  'price'  , 'discount', 'discount_type', 'tip', 'stars' , 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  type:any;
  logged_data:any;
  picUrl:any = config.API_URL+'/server/data/driver/';
  errors:any=['', null, undefined];
  searchParams:any=[];
  sellers:any;

  orderNumber:any;
  rating:any;
  tip:any;
  storeName:any='storeName';
  status:any="status";
  orderMode:any="orderMode";
  placedAt:any;
  preOrderDate:any;
  preOrderTime:any;
  storeNamee:any;
  address:any;
  driver:any="Driver";
  amount:any
  pm:any='pm';


  constructor(
    
    public router: Router,
    public noti:NotifiService,
    public api:ApiService,
    public spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef) {
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
 
    this.get_products();
    this.get_buyers()

    this.searchParams = ['orderNumber', 'status', 'orderMode', 'placedAt', 'preOrderDate', 'preOrderTime', 'buyerName', 'address', 'driver', 'amount', 'pm', 'tip', 'rating', 'storeName']
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
  }

 
  add(){
    this.router.navigate(['/pages/addproduct'])
  }
  manage(id){
    this.router.navigate(['/pages/manageorder/'+id])
  }

  get_products(){
    this.spinner.show();  
    this.api.api('getMyOrders',{id: this.logged_data._id, type: this.type}).subscribe((result) => {
    this.spinner.hide();
     console.log(result);
     var res;
     res = result;

     console.log('resresres',res)

     if(res.status==1){
      this.orderNumber = '';
      this.rating= '';
      this.tip= '';
      this.storeName= 'storeName';
      this.status= 'status';
      this.orderMode= 'orderMode';
      this.placedAt= '';
      this.preOrderDate= '';
      this.preOrderTime= '';
      this.storeNamee= '';
      this.address= '';
      this.driver= 'Driver';
      this.amount= '';
      this.pm= 'pm';
      this.dataSource = new MatTableDataSource(res.data);
     }else{
      this.dataSource = new MatTableDataSource([]);
     }
   

      }, err => {
      this.spinner.hide();     
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }

  delete(id, i){
    this.spinner.show();
    this.api.api('deleteProduct', {id: id}).subscribe((result) => {
      this.spinner.hide();
      if(result.status==1){
        this.dataSource.data.splice(i,1);
        this.dataSource._updateChangeSubscription()
        this.noti.success('Product has been deleted.','Product Deleted');
      }else{
        this.noti.success('Server Error.','Product Deletion');

      }
 
       }, err => {
        this.spinner.hide(); 
        this.noti.error('Internal server error, Please try again later', 'Server error');
      });

  }

  reset(){
    this.get_products();
  }

  filter(){
    this.spinner.show();  
    var req = {
      orderNumber:this.orderNumber,
      rating:  this.rating,
      tip:     this.tip,
      storeName: this.storeName,
      status:  this.status,
      orderMode: this.orderMode,
      placedAt: this.placedAt,
      preOrderDate: this.preOrderDate,
      preOrderTime: this.preOrderTime,
      storeNamee: this.storeNamee,
      address: this.address,
      driver: this.driver,
      amount: this.amount,
      pm: this.pm
    }

    this.api.api('filterOrders',{id: this.logged_data._id, type: this.type, filters: req}).subscribe((result) => {
      this.spinner.hide();
       console.log(result);
       var res;
       res = result;
  
       if(res.status==1){
        this.dataSource = new MatTableDataSource(res.data);
       }else{
        this.dataSource = new MatTableDataSource([]);
        this.noti.warning('Nothing matched with your search', 'No record found');
       }
     
  
        }, err => {
        this.spinner.hide();     
         this.noti.error('Internal server error, Please try again later', 'Server error');
       });


  }

  get_buyers(){
    this.spinner.show();
    this.api.api('getAllSellers','').subscribe((result) => {
      this.spinner.hide();
      this.sellers = result;
      }, err => {
        this.spinner.hide();
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }

}
  export interface Element {  
    name: string;
    location: string;
    playerjoined: string;
    starttime: string;
    endtime: string;
    owner: string;
    }
    const ELEMENT_DATA: Element[] = [
    
    ];


 