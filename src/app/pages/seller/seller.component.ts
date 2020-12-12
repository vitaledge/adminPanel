import { Component, Input,OnInit, ChangeDetectorRef } from '@angular/core';
import { NotifiService } from '../../services/notifi/notifi.service';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatTableDataSource} from  '@angular/material/table';
 


@Component({
  selector: 'ngx-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  
  displayedColumns = [ 'store_name', 'email',  'price'  , 'discount'  , 'discount_type' , 'quantity', 'quantity_type','category','action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  type:any;
  logged_data:any;
  constructor(
    
    public router: Router,
    public noti:NotifiService,
    public api:ApiService,
    public spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef) {
    this.type = Number(localStorage.getItem('admin'));
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
    this.spinner.show();
    this.get_products();
  }

  ngOnInit(): void {
  }

 
  add(){
    this.router.navigate(['/pages/addseller'])
  }

  get_products(){
     
    this.api.api('getAllSellers','').subscribe((result) => {
    this.spinner.hide();
     console.log(result);
     this.dataSource = new MatTableDataSource(result);

      }, err => {
      this.spinner.hide();     
       this.noti.error('Internal server error, Please try again later', 'Server error');
     });
  }

  delete(id, i){
    this.spinner.show();
    this.api.api('deleteSeller', {id: id}).subscribe((result) => {
      this.spinner.hide();
      if(result.status==1){
        this.dataSource.data.splice(i,1);
        this.dataSource._updateChangeSubscription()
        this.noti.success('Seller has been deleted.','Seller Deleted');
      }else{
        this.noti.success('Server Error.','Seller Deletion');

      }
 
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





