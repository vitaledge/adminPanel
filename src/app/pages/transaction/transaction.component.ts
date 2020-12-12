import { Component, Input,OnInit, ChangeDetectorRef } from '@angular/core';
import { NotifiService } from '../../services/notifi/notifi.service';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import {MatTableDataSource} from  '@angular/material/table';

@Component({
  selector: 'ngx-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  
  displayedColumns = [ 'price', 'store_name', 'email', 'discount'  , 'discount_type' , 'quantity_type','category'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  logged_data:any;
  type:any;
  constructor(
    
    public router: Router,
    public noti:NotifiService,
    public api:ApiService,
    public spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef) {
    this.logged_data = JSON.parse(localStorage.getItem('logged_data'));
    this.type = Number(localStorage.getItem('admin'));
    this.get_products();
  }

  ngOnInit(): void {
  }

 
  add(){
    this.router.navigate(['/pages/addproduct'])
  }

  get_products(){
     
    this.api.api('getTransactions',{id: this.logged_data._id}).subscribe((result) => {
       
     console.log(result);
     this.dataSource = new MatTableDataSource(result.data);

      }, err => {
          
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

